import { Component, Input, OnInit } from "@angular/core";
import { tap } from "rxjs";
import { CartService } from "src/app/cart.service";
import { ImageService } from "../../../image.service";

@Component({
  selector: "app-cart-item",
  templateUrl: "./cart-item.component.html",
  styleUrls: ["./cart-item.component.scss"],
})
export class CartItemComponent implements OnInit {
  @Input() product: any;
  quantity = 0;
  activeKeys = [];
  flag: NodeJS.Timeout | undefined;
  loading = true;

  constructor(
    public imageService: ImageService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.quantity = this.product.quantity;
    this.filterActiveKeys();
    this.loading = false;
  }

  filterActiveKeys() {
    this.activeKeys = this.product.product.keys.filter((key: any) => {
      return key.status === false;
    });
  }

  handleUpdateQuantity(type: "increase" | "decrease") {
    if (this.flag) {
      clearTimeout(this.flag);
    }

    this.flag = setTimeout(() => {
      this.loading = true;
      this.cartService
        .updateQuantity({
          ...this.product,
          quantity: this.quantity,
        })
        .pipe(
          tap((response) => console.log("update quantity response", response))
        )
        .subscribe(() => {
          this.loading = false;
        });
    }, 400);

    if (type === "increase" && this.quantity < this.activeKeys.length) {
      this.quantity += 1;
    } else if (type === "decrease" && this.quantity > 1) {
      this.quantity -= 1;
    }
  }

  handleRemoveProduct() {
    this.loading = true;
    this.cartService.removeFromCart({ _id: this.product._id }).subscribe(() => {
      this.loading = false;
    });
  }
}
