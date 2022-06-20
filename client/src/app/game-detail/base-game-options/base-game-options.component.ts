import { Component, Input, OnInit } from "@angular/core";
import { CartService } from "src/app/cart.service";

@Component({
  selector: "app-base-game-options",
  templateUrl: "./base-game-options.component.html",
  styleUrls: ["./base-game-options.component.scss"],
})
export class BaseGameOptionsComponent implements OnInit {
  @Input() product: any;
  quantity = 1;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  addToCart() {
    this.cartService.addToCart({
      _id: this.product._id,
      quantity: this.quantity,
    });
  }

  getActiveKey(keys: any[]) {
    return keys.filter((key) => key.status === false);
  }
}
