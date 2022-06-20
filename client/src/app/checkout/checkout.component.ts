import { CdkAccordionItem } from "@angular/cdk/accordion";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { loadScript, PayPalNamespace } from "@paypal/paypal-js";
import { loadStripe, Stripe, StripeCardElement } from "@stripe/stripe-js";
import { concatMap, tap } from "rxjs";
import { AuthService } from "../auth.service";
import { CartService } from "../cart.service";
import { ImageService } from "../image.service";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"],
})
export class CheckoutComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    public cartService: CartService,
    public imageService: ImageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.cartDetail$.subscribe();
  }

  expanded = -1;

  card: StripeCardElement | undefined;
  stripe: Stripe | null = null;
  stripeClientSecret: string | undefined;

  paypal: PayPalNamespace | null = null;
  amount = 0;

  stripe$ = this.authService.refresh$.pipe(
    concatMap(({ token }) =>
      this.http
        .get("https://localhost:5000/api/payments/stripe", this.config(token))
        .pipe(tap((data) => console.log(data)))
    ),
    tap(async ({ clientSecret }: any) => {
      this.stripeClientSecret = clientSecret;
      this.stripe = await loadStripe(
        "pk_test_51Iwqe0KvZqrt4tRI0ZewUir13YIgFCeoaO9AQQb2w6a1Lu8AnWN2TypvEg4Q24xXXM8rL0BChZEjaIdx5FOYgVqQ0081tq7z3V"
      );
      var elements = this.stripe?.elements();
      var style = {
        base: {
          color: "white",
        },
      };
      this.card = elements?.create("card", { style: style });
    })
  );

  paypal$ = this.authService.refresh$.pipe(
    concatMap(({ token }) =>
      this.http
        .get("https://localhost:5000/api/payments/paypal", this.config(token))
        .pipe(tap((data) => console.log({ paypal: data })))
    ),
    tap(async ({ amount, clientId }: any) => {
      this.paypal = await loadScript({
        "client-id": clientId,
        "disable-funding": "card",
      });
      this.amount = amount;
    })
  );

  items = [
    { id: 1, name: "stripe" },
    { id: 2, name: "paypal" },
  ];
  expandedIndex = 0;

  openAccordion(accordionItem: CdkAccordionItem, id: number) {
    accordionItem.toggle();
    if (id === this.items[0].id) {
      this.mountStripeCard();
    } else {
      this.mountPaypalElement();
    }
  }

  mountStripeCard() {
    const existElement = document
      .querySelector("#card-element")
      ?.querySelector("iframe");
    if (existElement) {
      return;
    }
    this.card?.mount("#card-element");
    this.card?.on("change", (event) => {
      var displayError = document.getElementById("card-errors");
      if (event.error && displayError) {
        displayError.textContent = event.error.message;
      } else if (displayError) {
        displayError.textContent = "";
      }
    });
  }

  async stripeHandler(event: MouseEvent) {
    event.preventDefault();
    (event.target as HTMLButtonElement).disabled = true;
    if (this.stripeClientSecret && this.card) {
      const paymentMethod = await this.stripe?.createPaymentMethod({
        type: "card",
        card: this.card,
      });
      if (!paymentMethod?.paymentMethod) {
        console.log(paymentMethod?.error);
      }
      this.stripe
        ?.confirmCardPayment(this.stripeClientSecret, {
          payment_method: paymentMethod?.paymentMethod?.id,
        })
        .then((result) => {
          if (result.error) {
            console.log(result.error.message);
          } else {
            if (result.paymentIntent.status === "succeeded") {
              const order = {
                cartId: this.cartService.cart._id,
                status: result.paymentIntent.status,
                paymentMethod: "stripe",
                paidAt: new Date(),
                details: {
                  exprMonth: paymentMethod?.paymentMethod?.card?.exp_month,
                  exprYear: paymentMethod?.paymentMethod?.card?.exp_year,
                  type: paymentMethod?.paymentMethod?.card?.funding,
                  brand: paymentMethod?.paymentMethod?.card?.brand,
                  last4: paymentMethod?.paymentMethod?.card?.last4,
                  paidAt: new Date(result.paymentIntent.created),
                },
              };
              this.createOrder(order);
            }
          }
        });
    }
  }

  async mountPaypalElement() {
    const paypalIframe = document
      .querySelector("#paypal-element")
      ?.querySelector("iframe");
    if (paypalIframe) {
      return;
    }
    try {
      if (!this.paypal) {
        console.log("failed to load paypal");
      }
      await this.paypal
        ?.Buttons?.({
          style: {
            tagline: false,
          },
          createOrder: (_, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: this.amount.toString(),
                  },
                },
              ],
              application_context: {
                shipping_preference: "NO_SHIPPING",
              },
            });
          },
          onApprove: async (_, actions) => {
            const payload = await actions.order?.capture();
            if (payload?.status === "COMPLETED") {
              const order = {
                cartId: this.cartService.cart._id,
                status: "succeeded",
                paymentMethod: "paypal",
                paidAt: new Date(),
                details: {
                  email: payload.payer.email_address,
                  name: payload.payer.name,
                },
              };
              this.createOrder(order);
            }
          },
          onError: async (error) => {
            console.log(error);
          },
        })
        .render("#paypal-element");
    } catch (error) {
      console.log(error);
    }
  }

  config = (token: string) => ({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  getCartTotal() {
    let total = 0;
    if (!this.cartService.cart) return;
    this.cartService.cart.products.forEach((product: any) => {
      if (product) {
        if (product.product) {
          total = total + product.product.sale_price * product.quantity;
        }
      }
    });
    return total;
  }
  createOrder(order: any) {
    order.total = this.getCartTotal();
    if (this.authService.acccessToken) {
      this.http
        .post(
          "https://localhost:5000/api/orders/create",
          order,
          this.config(this.authService.acccessToken)
        )
        .pipe(
          tap((data) =>
            this.router.navigateByUrl("/success", {
              state: {
                order: data,
              },
            })
          )
        )
        .subscribe();
    }
  }
}
