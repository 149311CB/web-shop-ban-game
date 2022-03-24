import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CartService } from "../cart.service";
import { ImageService } from "../image.service";
import { ProductService } from "../product.service";

@Component({
  selector: "header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  active = "discover";
  show = false;
  cartBriefSummary = { max: 0, currentInCart: 0 };
  updatedCart$ = this.cartService.addToCartAction$;
  constructor(
    private router: Router,
    private cartService: CartService,
    public productService: ProductService,
    public imageService: ImageService
  ) {}

  ngOnInit(): void {
    if (this.router.url.includes("discover")) {
      this.active = "discover";
    } else if (this.router.url.includes("browse")) {
      this.active = "browse";
    } else {
      this.active = "";
    }
    this.updatedCart$.subscribe((response) => {
      this.show = true;
      if (response.message) {
        this.cartBriefSummary = {
          max: response.details.max,
          currentInCart: response.details.in_cart,
        };
      } else {
        this.cartBriefSummary = {
          max: response.max,
          currentInCart: response.in_cart,
        };
      }
    });
  }

  handleCloseDropdown(isClose: boolean) {
    if (isClose) {
      this.show = false;
    }
  }
}
