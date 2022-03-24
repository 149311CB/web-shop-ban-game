import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter, tap } from "rxjs";
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
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((e) => {
        const event = e as NavigationEnd;
        this.checkRouter(event.url);
      });

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

  checkRouter(url: string) {
    if (url.includes("discover") || url === "/") {
      this.active = "discover";
    } else if (url.includes("browse")) {
      this.active = "browse";
    } else if (url.includes("detail")) {
      this.active = "detail";
    } else {
      this.active = "";
    }
  }
}
