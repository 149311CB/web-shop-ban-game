const head = `
<html>
  <head>
  </head>
  <body>
    <div
      data-role="module-unsubscribe"
      class="module"
      role="module"
      data-type="unsubscribe"
      style="
        color: #444444;
        font-size: 12px;
        line-height: 20px;
        padding: 16px 16px 16px 16px;
      "
      data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5"
    >
      <p class="header-text" style="text-align: center; margin-bottom: 0.6rem !important;">
        <strong>Thank you for your order</strong>
      </p>

      <div class="order-info" style="width: 100%;text-align: left;margin-bottom: 0.9rem !important;">
`;

const getOrderInfo = (date: string) => {
  return `
        <p class="section-text" style="color: #348eda; font-weight: 600;">
          Order information
          <span style="font-weight: 400; color: grey">${date}</span>
        </p>
        <hr
          style="
            border-width: 0;
            border-bottom-width: thin;
            margin: 0.1rem 0;
            border-color: hsla(0, 0%, 50%, 0.5);
          "
        />
    `;
};

const getUserAndPaymentInfo = (user: any, paymentMethod: any) => {
  return `
        <div class="order-info-details" style="display:flex;">
          <div style="width: 100%">
            <p class="medium-text" style="font-size:10px;font-weight: bold;">Payer info</p>
            <p style="font-size:10px;">${user.first_name + user.last_name}</p>
            <p></p>
            <p style="font-size:10px;">${user.email}</p>
            <p></p>
          </div>

          <div style="width: 100%">
            <p class="medium-text" style="font-size:10px;font-weight: bold;">Payment details</p>
            <p>Payment method: <span>${paymentMethod.method}</span></p>
            ${
              paymentMethod.method === "stripe"
                ? `<p>card's last 4 digit: ${paymentMethod.details.last4}</p>
            <p>brand: ${paymentMethod.details.brand}</p>`
                : `<p>card's last 4 digit: ${paymentMethod.details.email}</p>
            <p>brand: ${
              paymentMethod.details.name.given_name +
              paymentMethod.details.sur_name
            }</p>`
            }
          </div>
        </div>
        </div>
    `;
};

const getTableHead = () => {
  return `
    <p class="section-text" style="color: #348eda; font-weight: 600;">Order details</p>
      <hr
        style="
          border-width: 0;
          border-bottom-width: thin;
          margin: 0.1rem 0;
          border-color: hsla(0, 0%, 50%, 0.5);
        "
      />
      <table style="border-collapse: collapse;width: 100%;border:1px solid hsla(0, 0%, 50%, 1)">
        <tr>
          <th style="width: 70%;border:1px solid hsla(0, 0%, 50%, 0.5);background-color: #348eda;font-size: 13px;padding: 0.6rem 0; color: white;">Items</th>
          <th style="width: 70%;border:1px solid hsla(0, 0%, 50%, 0.5);background-color: #348eda;font-size: 13px;padding: 0.6rem 0; color: white;">Total</th>
        </tr>
    `;
};

const getTableRow = (game: any) => {
  return `
      <tr>
          <td style="padding: 0.3rem;border: 1px solid hsla(0, 0%, 50%, 0.5);vertical-align: top;">
            <div class="inline-row" style="width:100%;display: flex;align-items: flex-start;gap: 0.9rem;">
              <div class="img-container" style="width: 15%;">
                <img
                  src="${game.images[0]}"
                  style="width:100%;"
                />
              </div>
              <div>
                <p class="name">${game.name}</p>
                <p class="price">Price: $${game.sale_price}</p>
              </div>
            </div>
          </td>
          <td style="padding: 0.3rem;border: 1px solid hsla(0, 0%, 50%, 0.5); vertical-align: top;">
            <div class="column">
              <p>Quantity: <span>${game.quantity}</span></p>
              <p>Total: <span>$${game.quantity * game.sale_price}</span></p>
            </div>
          </td>
        </tr>
    `;
};

export const orderConfirmationBuilder = (
  date: Date,
  user: any,
  paymentMethod: any,
  products: any
) => {
  const row = products.map((product: any) => {
    return getTableRow(product);
  });
  const html =
    head +
    getOrderInfo(date.toLocaleDateString()) +
    getUserAndPaymentInfo(user, paymentMethod) +
    getTableHead() +
    row +
    `
      </table>
          </div>
        </body>
      </html>
    `;
  return html;
};
