// Signed session for the /studio login gate.
//
// The cookie holds `<expiry>.<nonce>.<signature>`, where the signature is an
// HMAC-SHA256 of `<expiry>.<nonce>` keyed with STUDIO_SESSION_SECRET. It never
// contains the username or password. Uses Web Crypto so it runs in both the
// Edge middleware and Node route handlers.

export const STUDIO_COOKIE = "studio_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12; // 12 hours

type StudioConfig = {
  username: string;
  password: string;
  secret: string;
};

/** Returns null when any required variable is missing, so callers fail closed. */
export function getStudioConfig(): StudioConfig | null {
  const username = process.env.STUDIO_USERNAME;
  const password = process.env.STUDIO_PASSWORD;
  const secret = process.env.STUDIO_SESSION_SECRET;
  if (!username || !password || !secret || secret.length < 32) {
    return null;
  }
  return { username, password, secret };
}

const encoder = new TextEncoder();

function toBase64Url(bytes: Uint8Array) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array<ArrayBuffer> | null {
  try {
    const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
    const binary = atob(base64 + "=".repeat((4 - (base64.length % 4)) % 4));
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
  } catch {
    return null;
  }
}

function importKey(secret: string) {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

export async function createSessionToken(secret: string, now = Date.now()) {
  const expiry = Math.floor(now / 1000) + SESSION_MAX_AGE_SECONDS;
  const nonce = toBase64Url(crypto.getRandomValues(new Uint8Array(16)));
  const payload = `${expiry}.${nonce}`;
  const key = await importKey(secret);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return `${payload}.${toBase64Url(new Uint8Array(signature))}`;
}

export async function verifySessionToken(
  token: string | undefined,
  secret: string,
  now = Date.now(),
) {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [expiry, nonce, signature] = parts;

  const expirySeconds = Number(expiry);
  if (!Number.isInteger(expirySeconds) || expirySeconds * 1000 <= now) return false;

  const signatureBytes = fromBase64Url(signature);
  if (!signatureBytes) return false;

  const key = await importKey(secret);
  // crypto.subtle.verify compares the HMAC in constant time.
  return crypto.subtle.verify(
    "HMAC",
    key,
    signatureBytes,
    encoder.encode(`${expiry}.${nonce}`),
  );
}
