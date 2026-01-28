import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { quoteSchema } from "@/lib/validators/quote";
import { BUSINESS_NAME, EMAIL_TO, PUBLIC_PHONE } from "@/lib/config";
import { checkRateLimit } from "@/lib/rate-limit";

const resend = new Resend(process.env.RESEND_API_KEY);

// Email sender - use your verified domain, fallback to Resend test domain
const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev";

function getOwnerEmailHtml(data: {
  fullName: string;
  phone: string;
  email?: string;
  serviceType: string;
  vehicle: string;
  location: string;
  preferredTime?: string;
  details: string;
}) {
  const serviceLabel = data.serviceType === "mechanic" ? "Mobile Mechanic" : "Window Tint";
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color: #E11D2E; padding: 24px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px;">New Quote Request</h1>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding: 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom: 24px;">
                    <h2 style="margin: 0 0 8px 0; color: #333; font-size: 18px;">Customer Information</h2>
                    <table width="100%" cellpadding="8" cellspacing="0" style="background-color: #f9f9f9; border-radius: 4px;">
                      <tr>
                        <td width="140" style="color: #666; font-weight: bold;">Name:</td>
                        <td style="color: #333;">${data.fullName}</td>
                      </tr>
                      <tr>
                        <td style="color: #666; font-weight: bold;">Phone:</td>
                        <td style="color: #333;"><a href="tel:${data.phone}" style="color: #E11D2E;">${data.phone}</a></td>
                      </tr>
                      <tr>
                        <td style="color: #666; font-weight: bold;">Email:</td>
                        <td style="color: #333;">${data.email ? `<a href="mailto:${data.email}" style="color: #E11D2E;">${data.email}</a>` : "Not provided"}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 24px;">
                    <h2 style="margin: 0 0 8px 0; color: #333; font-size: 18px;">Service Request</h2>
                    <table width="100%" cellpadding="8" cellspacing="0" style="background-color: #f9f9f9; border-radius: 4px;">
                      <tr>
                        <td width="140" style="color: #666; font-weight: bold;">Service Type:</td>
                        <td style="color: #333;"><span style="background-color: #E11D2E; color: white; padding: 4px 12px; border-radius: 4px; font-size: 14px;">${serviceLabel}</span></td>
                      </tr>
                      <tr>
                        <td style="color: #666; font-weight: bold;">Vehicle:</td>
                        <td style="color: #333;">${data.vehicle}</td>
                      </tr>
                      <tr>
                        <td style="color: #666; font-weight: bold;">Location:</td>
                        <td style="color: #333;">${data.location}</td>
                      </tr>
                      <tr>
                        <td style="color: #666; font-weight: bold;">Preferred Time:</td>
                        <td style="color: #333;">${data.preferredTime || "Not specified"}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h2 style="margin: 0 0 8px 0; color: #333; font-size: 18px;">Details</h2>
                    <div style="background-color: #f9f9f9; border-radius: 4px; padding: 16px; color: #333; line-height: 1.6;">
                      ${data.details.replace(/\n/g, "<br>")}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #333; padding: 16px; text-align: center;">
              <p style="margin: 0; color: #999; font-size: 12px;">
                This quote request was submitted from your website.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

function getCustomerEmailHtml(data: {
  fullName: string;
  serviceType: string;
  vehicle: string;
}, businessName: string, phone: string) {
  const serviceLabel = data.serviceType === "mechanic" ? "Mobile Mechanic" : "Window Tint";
  const firstName = data.fullName.split(" ")[0];

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color: #E11D2E; padding: 24px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px;">${businessName}</h1>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding: 32px;">
              <h2 style="margin: 0 0 16px 0; color: #333; font-size: 22px;">Thanks for reaching out, ${firstName}!</h2>
              
              <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
                We received your <strong>${serviceLabel}</strong> quote request for your <strong>${data.vehicle}</strong>. 
                We'll review the details and get back to you as soon as possible.
              </p>

              <div style="background-color: #f9f9f9; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                <h3 style="margin: 0 0 12px 0; color: #333; font-size: 16px;">What happens next?</h3>
                <ul style="margin: 0; padding-left: 20px; color: #555; line-height: 1.8;">
                  <li>We'll review your request</li>
                  <li>We'll reach out to confirm details and availability</li>
                  <li>We'll provide you with a clear quote</li>
                </ul>
              </div>

              <div style="background-color: #E11D2E; border-radius: 8px; padding: 20px; text-align: center;">
                <p style="margin: 0 0 8px 0; color: #ffffff; font-size: 14px;">Need immediate assistance?</p>
                <a href="tel:${phone}" style="color: #ffffff; font-size: 24px; font-weight: bold; text-decoration: none;">${phone}</a>
              </div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #333; padding: 20px; text-align: center;">
              <p style="margin: 0 0 8px 0; color: #ffffff; font-size: 14px;">${businessName}</p>
              <p style="margin: 0; color: #999; font-size: 12px;">
                Mobile Mechanic & Window Tint Services
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export async function POST(request: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const rate = checkRateLimit(ip);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: `Please wait ${rate.retryAfter}s before trying again.` },
      { status: 429 },
    );
  }

  const body = await request.json();
  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission.", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  if (parsed.data.honeypot) {
    return NextResponse.json({ ok: true });
  }

  const data = parsed.data;
  const ownerEmail = process.env.EMAIL_TO || EMAIL_TO;
  const fromAddress = `${BUSINESS_NAME} <${FROM_EMAIL}>`;

  // Send email to business owner
  try {
    await resend.emails.send({
      from: fromAddress,
      to: ownerEmail,
      subject: `🚗 New Quote Request - ${data.fullName} (${data.serviceType === "mechanic" ? "Mechanic" : "Tint"})`,
      html: getOwnerEmailHtml(data),
    });
  } catch (error) {
    console.error("Failed to send owner email:", error);
    return NextResponse.json(
      { error: "Failed to send your request. Please try again." },
      { status: 500 },
    );
  }

  // Send confirmation email to customer (if they provided email)
  if (data.email) {
    try {
      await resend.emails.send({
        from: fromAddress,
        to: data.email,
        subject: `We received your quote request - ${BUSINESS_NAME}`,
        html: getCustomerEmailHtml(data, BUSINESS_NAME, PUBLIC_PHONE),
      });
    } catch (error) {
      // Don't fail the request if customer email fails
      console.error("Failed to send customer confirmation email:", error);
    }
  }

  return NextResponse.json({ ok: true });
}
