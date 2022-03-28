import { Component, OnInit } from "@angular/core";
import { tap } from "rxjs";
import { CartService } from "../../cart.service";
import { ImageService } from "../../image.service";

@Component({
  selector: "app-cart-detail",
  templateUrl: "./cart-detail.component.html",
  styleUrls: ["./cart-detail.component.scss"],
})
export class CartDetailComponent implements OnInit {
  totalPrice = 0;
  cartDetail$ = this.cartSerivice.cartDetail$.pipe(
    tap((cart) => {
      this.calculateTotalPrice(cart);
    })
  );

  constructor(
    private cartSerivice: CartService,
    public imageService: ImageService
  ) {}

  ngOnInit(): void {}

  calculateTotalPrice(cart: any) {
    if (!cart) return;
    this.totalPrice = 0;
    cart.products.forEach((product: any) => {
      if (product) {
        if (product.product) {
          this.totalPrice =
            this.totalPrice + product.product.sale_price * product.quantity;
        }
      }
    });
  }
}
