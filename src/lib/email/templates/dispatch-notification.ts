import { Order } from "@/types/order";

export function renderDispatchNotificationEmail(order: Order): { subject: string; html: string } {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>FRAGOLOGY Consignment Dispatched</title>
      <style>
        body { margin: 0; padding: 0; background-color: #080706; font-family: 'Inter', Arial, sans-serif; color: #F4EFE5; }
        .container { max-width: 600px; margin: 40px auto; background-color: #0D0B09; border: 1px solid rgba(200, 164, 93, 0.35); padding: 40px; }
      </style>
    </head>
    <body style="background-color: #080706; padding: 20px 0;">
      <div class="container" style="max-width: 600px; margin: 0 auto; background-color: #0D0B09; border: 1px solid rgba(200, 164, 93, 0.35); padding: 40px; box-shadow: 0 10px 40px rgba(0,0,0,0.8);">
        
        <div style="text-align: center; padding-bottom: 30px; border-bottom: 1px solid rgba(200, 164, 93, 0.2);">
          <h1 style="font-family: 'Playfair Display', Georgia, serif; font-size: 28px; font-weight: 300; letter-spacing: 0.3em; color: #F4EFE5; margin: 0; text-transform: uppercase;">
            FRAGOLOGY
          </h1>
          <p style="font-size: 9px; letter-spacing: 0.4em; text-transform: uppercase; color: #C8A45D; margin-top: 6px;">
            Atelier Dispatch &bull; In Insured Transit
          </p>
        </div>

        <div style="padding: 30px 0 20px 0;">
          <h2 style="font-family: 'Playfair Display', Georgia, serif; font-size: 20px; font-weight: 300; color: #E2C78D; margin: 0 0 12px 0;">
            Chère/Cher ${order.customerName},
          </h2>
          <p style="font-size: 13px; line-height: 1.7; color: #AFA497; margin: 0;">
            Your flacons have completed final inspection and have been dispatched via white-glove insured courier. Your consignment is now in transit.
          </p>
        </div>

        <div style="background-color: #17110C; border: 1px solid rgba(200, 164, 93, 0.25); padding: 24px; margin: 20px 0; text-align: center;">
          <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.25em; color: #AFA497; display: block; margin-bottom: 6px;">
            Carrier &amp; Tracking Code
          </span>
          <span style="font-size: 12px; color: #E2C78D; display: block; margin-bottom: 4px;">
            ${order.shippingCarrier || "DHL Express Luxury Network"}
          </span>
          <span style="font-family: 'Courier New', monospace; font-size: 18px; letter-spacing: 0.1em; color: #C8A45D; font-weight: bold;">
            ${order.trackingNumber || "TRK-FRG-849102-US"}
          </span>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/order-tracking" 
             style="display: inline-block; padding: 14px 32px; background-color: #C8A45D; color: #080706; text-decoration: none; font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; font-weight: bold;">
            Track Consignment Live
          </a>
        </div>

        <div style="border-top: 1px solid rgba(200, 164, 93, 0.2); padding-top: 25px; text-align: center;">
          <p style="font-size: 11px; line-height: 1.6; color: #AFA497; margin: 0;">
            A direct signature from an adult recipient is requested upon arrival to maintain chain-of-custody.
          </p>
        </div>

      </div>
    </body>
    </html>
  `;

  return {
    subject: `Consignment Dispatched: FRAGOLOGY Flacons for Order ${order.orderNumber}`,
    html,
  };
}
