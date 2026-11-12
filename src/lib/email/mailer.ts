import { Order } from "@/types/order";
import { renderOrderConfirmationEmail } from "./templates/order-confirmation";
import { renderDispatchNotificationEmail } from "./templates/dispatch-notification";

export interface MailerResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export async function sendOrderConfirmationEmail(order: Order): Promise<MailerResult> {
  const { subject, html } = renderOrderConfirmationEmail(order);

  // In production with Resend or SendGrid:
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey && !resendApiKey.includes("...")) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "FRAGOLOGY Concierge <concierge@fragology.com>",
          to: [order.customerEmail],
          subject,
          html,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to dispatch email via Resend");
      }
      return { success: true, messageId: data.id };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Email dispatch exception";
      console.error("[FRAGOLOGY Email Error]:", msg);
      return { success: false, error: msg };
    }
  }

  // Development & Sandboxed Fallback: Log authoritative email dispatch
  console.log(`\n======================================================`);
  console.log(`[FRAGOLOGY Transactional Email Dispatcher]`);
  console.log(`To: ${order.customerEmail} (${order.customerName})`);
  console.log(`Subject: ${subject}`);
  console.log(`Order Reference: ${order.orderNumber}`);
  console.log(`Total: ₹${order.totalAmount.toLocaleString("en-IN")} INR`);
  console.log(`======================================================\n`);

  return {
    success: true,
    messageId: `dev-msg-${order.orderNumber}-${Date.now()}`,
  };
}

export async function sendDispatchNotificationEmail(order: Order): Promise<MailerResult> {
  const { subject, html } = renderDispatchNotificationEmail(order);

  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey && !resendApiKey.includes("...")) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "FRAGOLOGY Atelier Dispatch <dispatch@fragology.com>",
          to: [order.customerEmail],
          subject,
          html,
        }),
      });
      const data = await res.json();
      return { success: true, messageId: data.id };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Email dispatch exception";
      return { success: false, error: msg };
    }
  }

  console.log(`[FRAGOLOGY Dispatch Email] Dispatched to ${order.customerEmail} for order ${order.orderNumber}`);
  return { success: true, messageId: `dev-dispatch-${order.orderNumber}` };
}
