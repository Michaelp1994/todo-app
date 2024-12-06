import type {
  APIGatewayEvent,
  CreateAWSLambdaContextOptions,
} from "@trpc/server/adapters/aws-lambda";
import {
  deleteSessionTokenCookie,
  getSessionTokenFromHeaders,
  setSessionTokenCookie,
} from "./auth/cookies";
import { db } from "./db";
import { validateSessionToken } from "./auth/sessions";

export default async function createContext({
  event,
}: CreateAWSLambdaContextOptions<APIGatewayEvent>) {
  const resHeaders = new Headers();
  const setSessionCookie = (token: string, expiresAt: Date) => {
    setSessionTokenCookie(resHeaders, token, expiresAt);
  };
  const deleteSessionCookie = () => {
    deleteSessionTokenCookie(resHeaders);
  };
  const sessionToken = getSessionTokenFromHeaders(event.headers);
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
