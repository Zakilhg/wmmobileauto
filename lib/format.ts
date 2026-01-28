export function toTelLink(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "#";
  const normalized = digits.length === 10 ? `+1${digits}` : digits;
  return `tel:${normalized}`;
}

export function toSmsLink(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "#";
  const normalized = digits.length === 10 ? `+1${digits}` : digits;
  return `sms:${normalized}`;
}

