import { Order } from "@/types/order";

export function renderOrderConfirmationEmail(order: Order): { subject: string; html: string } {
  const itemsHtml = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 14px 0; border-bottom: 1px solid rgba(200, 164, 93, 0.2); font-family: 'Playfair Display', Georgia, serif; color: #F4EFE5; font-size: 15px;">
          <strong>${item.productName}</strong><br>
          <span style="font-family: 'Inter', sans-serif; font-size: 11px; color: #AFA497; text-transform: uppercase; letter-spacing: 0.15em;">
            ${item.volumeDisplay} &bull; ${item.concentration} &bull; Qty: ${item.quantity}
          </span>
        </td>
        <td style="padding: 14px 0; border-bottom: 1px solid rgba(200, 164, 93, 0.2); text-align: right; font-family: 'Playfair Display', Georgia, serif; color: #C8A45D; font-size: 15px; vertical-align: top;">
          $${((item.unitPrice ?? item.priceNum) * item.quantity).toFixed(2)}
        </td>
      </tr>
    `
    )
    .join("");

  const address = order.shippingAddress;
  const addressHtml = `
    ${address.fullName}<br>
    ${address.streetAddress1}${address.streetAddress2 ? `, ${address.streetAddress2}` : ""}<br>
    ${address.city}, ${address.stateProvince} ${address.postalCode}<br>
    ${address.country}
  `;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>FRAGOLOGY Order Confirmation</title>
      <style>
        body { margin: 0; padding: 0; background-color: #080706; font-family: 'Inter', Arial, sans-serif; color: #F4EFE5; }
        .container { max-width: 600px; margin: 40px auto; background-color: #0D0B09; border: 1px solid rgba(200, 164, 93, 0.35); padding: 40px; }
      </style>
    </head>
    <body style="background-color: #080706; padding: 20px 0;">
      <div class="container" style="max-width: 600px; margin: 0 auto; background-color: #0D0B09; border: 1px solid rgba(200, 164, 93, 0.35); padding: 40px; box-shadow: 0 10px 40px rgba(0,0,0,0.8);">
        
        <!-- Header -->
        <div style="text-align: center; padding-bottom: 30px; border-bottom: 1px solid rgba(200, 164, 93, 0.2);">
          <h1 style="font-family: 'Playfair Display', Georgia, serif; font-size: 28px; font-weight: 300; letter-spacing: 0.3em; color: #F4EFE5; margin: 0; text-transform: uppercase;">
            FRAGOLOGY
          </h1>
          <p style="font-size: 9px; letter-spacing: 0.4em; text-transform: uppercase; color: #C8A45D; margin-top: 6px;">
            Haute Parfumerie &bull; Paris & Grasse
          </p>
        </div>

        <!-- Greeting -->
        <div style="padding: 30px 0 20px 0;">
          <h2 style="font-family: 'Playfair Display', Georgia, serif; font-size: 20px; font-weight: 300; color: #E2C78D; margin: 0 0 12px 0;">
            Chère/Cher ${order.customerName},
          </h2>
          <p style="font-size: 13px; line-height: 1.7; color: #AFA497; margin: 0;">
            We have received your commission with utmost care. Your architectural flacons are currently being prepared, hand-inspected, and packaged at our atelier with signature presentation cases and exterior discovery vials.
          </p>
        </div>

        <!-- Order Reference Badge -->
        <div style="background-color: #17110C; border: 1px solid rgba(200, 164, 93, 0.25); padding: 18px; margin: 20px 0; text-align: center;">
          <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.25em; color: #AFA497; display: block; margin-bottom: 4px;">
            Atelier Commission Reference
          </span>
          <span style="font-family: 'Playfair Display', Georgia, serif; font-size: 22px; letter-spacing: 0.15em; color: #C8A45D; font-weight: bold;">
            ${order.orderNumber}
          </span>
        </div>

        <!-- Line Items Table -->
        <table style="width: 100%; border-collapse: collapse; margin: 25px 0;">
          <thead>
            <tr>
              <th style="text-align: left; font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; color: #AFA497; padding-bottom: 10px; border-bottom: 1px solid rgba(200, 164, 93, 0.3);">
                Flacon Selection
              </th>
              <th style="text-align: right; font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; color: #AFA497; padding-bottom: 10px; border-bottom: 1px solid rgba(200, 164, 93, 0.3);">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <!-- Totals Summary -->
        <div style="border-top: 1px solid rgba(200, 164, 93, 0.2); padding-top: 15px; margin-bottom: 30px;">
          <table style="width: 100%; font-size: 12px; color: #AFA497; line-height: 1.8;">
            <tr>
              <td>Subtotal</td>
              <td style="text-align: right; color: #F4EFE5;">$${order.subtotal.toFixed(2)}</td>
            </tr>
            ${
              order.discountAmount > 0
                ? `<tr>
                    <td style="color: #C8A45D;">Maison Courtesy (${order.couponCode || "Privilège"})</td>
                    <td style="text-align: right; color: #C8A45D;">-$${order.discountAmount.toFixed(2)}</td>
                  </tr>`
                : ""
            }
            <tr>
              <td>White Glove Insured Courier</td>
              <td style="text-align: right; color: #E2C78D;">${order.shippingFee === 0 ? "Complimentary" : `$${order.shippingFee.toFixed(2)}`}</td>
            </tr>
            <tr>
              <td>Excise & Estimated Duties</td>
              <td style="text-align: right; color: #F4EFE5;">$${order.taxAmount.toFixed(2)}</td>
            </tr>
            <tr style="border-top: 1px solid rgba(200, 164, 93, 0.3); font-size: 15px;">
              <td style="padding-top: 12px; color: #F4EFE5; font-family: 'Playfair Display', Georgia, serif;">Total Investment</td>
              <td style="padding-top: 12px; text-align: right; font-family: 'Playfair Display', Georgia, serif; font-size: 20px; color: #C8A45D;">
                $${order.totalAmount.toFixed(2)} USD
              </td>
            </tr>
          </table>
        </div>

        <!-- Destination Address -->
        <div style="background-color: #17110C; padding: 20px; border: 1px solid rgba(200, 164, 93, 0.15); margin-bottom: 30px;">
          <h3 style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; color: #C8A45D; margin: 0 0 10px 0;">
            Consignment Destination
          </h3>
          <p style="font-size: 12px; line-height: 1.6; color: #F4EFE5; margin: 0;">
            ${addressHtml}
          </p>
        </div>

        <!-- Guarantee Note -->
        <div style="border-top: 1px solid rgba(200, 164, 93, 0.2); padding-top: 25px; text-align: center;">
          <p style="font-size: 11px; line-height: 1.6; color: #AFA497; margin: 0 0 15px 0;">
            Each commissioned flacon arrives sealed with a complimentary 2ml exterior discovery vial. Test the scent vial first. Should the olfactory profile not exceed your expectations, return the unopened presentation box within 14 days for a full refund.
          </p>
          <p style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.25em; color: #C8A45D; margin: 0;">
            FRAGOLOGY CONCIERGE &bull; CONCIERGE@FRAGOLOGY.COM
          </p>
        </div>

      </div>
    </body>
    </html>
  `;

  return {
    subject: `Commission Confirmed: FRAGOLOGY Flacon Order ${order.orderNumber}`,
    html,
  };
}
