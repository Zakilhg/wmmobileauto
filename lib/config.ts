export const BUSINESS_NAME = "Within Minutes Mobile Auto Repair";
export const PHONE = "571-343-6043";
export const TEXT_NUMBER = PHONE;
export const EMAIL_TO = "info@wmmobileauto.com";
export const WEBSITE = "https://wmmobileauto.com";
export const PRIMARY_COLOR = "#E11D2E";

// Logo path for emails and components
export const LOGO_PATH = "/logo/Logo1.png";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || WEBSITE;

export const PUBLIC_PHONE = process.env.NEXT_PUBLIC_PHONE || PHONE;
export const PUBLIC_TEXT_NUMBER =
  process.env.NEXT_PUBLIC_TEXT_NUMBER || TEXT_NUMBER;

// Full logo URL for emails
export const LOGO_URL = `${SITE_URL}${LOGO_PATH}`;

