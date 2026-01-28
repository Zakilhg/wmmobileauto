const cooldownMs = 60 * 1000;
const ipCache = new Map<string, number>();

export function checkRateLimit(ip: string) {
  const now = Date.now();
  const last = ipCache.get(ip);
  if (last && now - last < cooldownMs) {
    return { allowed: false, retryAfter: Math.ceil((cooldownMs - (now - last)) / 1000) };
  }
  ipCache.set(ip, now);
  return { allowed: true, retryAfter: 0 };
}

