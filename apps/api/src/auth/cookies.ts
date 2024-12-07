import { serialize, parse } from "cookie";

export function setSessionTokenCookie(
  headers: Headers,
  token: string,
  expiresAt: Date,
): void {
  const cookie = serialize("session", token, {
    httpOnly: true,
    sameSite: "none",
    expires: expiresAt,
    path: "/",
    secure: process.env["SST_STAGE"] === "production" ? true : true,
  });
  headers.append("Set-Cookie", cookie);
}

export function getSessionTokenFromHeaders(headers: Headers): string | null {
  const unparsedCookies = headers.get("cookie");
  if (!unparsedCookies) {
    return null;
  }
  const cookies = parse(unparsedCookies);
  return cookies.session || null;
}

export function deleteSessionTokenCookie(headers: Headers): void {
  const cookie = serialize("session", "", {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 0,
    path: "/",
    secure: process.env["SST_STAGE"] === "production" ? true : false,
  });
  headers.append("Set-Cookie", cookie);
}
