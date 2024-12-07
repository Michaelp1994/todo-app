import {
  deleteSessionTokenCookie,
  getSessionTokenFromHeaders,
  setSessionTokenCookie,
} from "./auth/cookies";
import { db } from "./db";
import { validateSessionToken } from "./auth/sessions";

interface CreateContextInput {
  headers: Headers;
}

export default async function createContext({ headers }: CreateContextInput) {
  const resHeaders = new Headers();
  const setSessionCookie = (token: string, expiresAt: Date) => {
    setSessionTokenCookie(resHeaders, token, expiresAt);
  };
  const deleteSessionCookie = () => {
    deleteSessionTokenCookie(resHeaders);
  };
  const sessionToken = getSessionTokenFromHeaders(headers);
  if (!sessionToken) {
    return {
      db,
      resHeaders,
      setSessionCookie,
      deleteSessionCookie,
    };
  }

  const { user, session } = await validateSessionToken(sessionToken);
  return {
    db,
    resHeaders,
    setSessionCookie,
    deleteSessionCookie,
    user,
    session,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
