import { eq } from "drizzle-orm";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import { sessionTable, type Session } from "../db/schemas/session";
import { userTable, type User } from "../db/schemas/user";
import type { Database } from "../db";
// TODO: decouple from db for testing

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };

const THIRTY_DAYS = 1000 * 60 * 60 * 24 * 30; // in milliseconds
const FIFTEEN_DAYS = 1000 * 60 * 60 * 24 * 15; // in milliseconds

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export async function createSession(
  token: string,
  userId: number,
  db: Database
): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + THIRTY_DAYS),
  };
  await db.insert(sessionTable).values(session);
  return session;
}

export async function validateSessionToken(
  token: string,
  db: Database
): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const result = await db
    .select({ user: userTable, session: sessionTable })
    .from(sessionTable)
    .innerJoin(userTable, eq(sessionTable.userId, userTable.id))
    .where(eq(sessionTable.id, sessionId));
  if (result.length < 1) {
    return { session: null, user: null };
  }
  const { user, session } = result[0];
  if (Date.now() >= session.expiresAt.getTime()) {
    await db.delete(sessionTable).where(eq(sessionTable.id, session.id));
    return { session: null, user: null };
  }
  if (Date.now() >= session.expiresAt.getTime() - FIFTEEN_DAYS) {
    session.expiresAt = new Date(Date.now() + THIRTY_DAYS);
    await db
      .update(sessionTable)
      .set({
        expiresAt: session.expiresAt,
      })
      .where(eq(sessionTable.id, session.id));
  }
  return { session, user };
}

export async function invalidateSession(
  sessionId: string,
  db: Database
): Promise<void> {
  await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
}
