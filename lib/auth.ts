import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE_NAME = "crm_session";

function getSessionSecret() {
  const secret = process.env.SESSION_SECRET;

  if (!secret) {
    throw new Error("Missing SESSION_SECRET environment variable.");
  }

  return secret;
}

export function getAdminKey() {
  return process.env.CRM_ADMIN_KEY;
}

function sign(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("hex");
}

function buildToken(expiresAt: number) {
  const payload = `${expiresAt}:${getAdminKey() ?? ""}`;
  return `${expiresAt}.${sign(payload)}`;
}

function verifyToken(token: string) {
  const [expiresAtRaw, signature] = token.split(".");
  const expiresAt = Number(expiresAtRaw);

  if (!expiresAt || !signature || Number.isNaN(expiresAt) || Date.now() > expiresAt) {
    return false;
  }

  const expected = sign(`${expiresAt}:${getAdminKey() ?? ""}`);
  return timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

export function createSessionCookie() {
  const maxAge = 60 * 60 * 12;

  return {
    name: SESSION_COOKIE_NAME,
    value: buildToken(Date.now() + maxAge * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

export async function isAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token || !getAdminKey()) {
    return false;
  }

  try {
    return verifyToken(token);
  } catch {
    return false;
  }
}

export async function requireAuth() {
  return isAuthenticated();
}
