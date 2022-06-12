import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { NavigationEnd, Router } from "@angular/router";
import { filter, tap } from "rxjs";
import { AuthService } from "../auth.service";
import { CartService } from "../cart.service";
import { ImageService } from "../image.service";
import { ProductService } from "../product.service";
import { AuthModalComponent } from "../shares/auth-modal/auth-modal.component";
import { LoginModalComponent } from "../shares/login-modal/login-modal.component";
import { ICartBriefSummary } from "./cart-dropdown/cart-dropdown.component";

@Component({
  selector: "header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  active = "discover";
  show = false;
  cartBriefSummary: ICartBriefSummary = {
    max: 0,
    currentInCart: 0,
    success: false,
    message: "",
  };
  updatedCart$ = this.cartService.addToCartAction$;
  paddingBottom = "pb-14";
  isShowAccountMenu = false;
  constructor(
    private router: Router,
    private cartService: CartService,
    public productService: ProductService,
    public imageService: ImageService,
    public dialog: MatDialog,
    public authService: AuthService
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
          success: false,
          message: response.message[0].toUpperCase() + response.message,
        };
      } else {
        this.cartBriefSummary = {
          max: response.max,
          currentInCart: response.in_cart,
          success: true,
          message: "A new item has been add to your cart",
        };
      }
    });
    this.authService.refresh$
      .pipe(
        tap(({ token }: any) => {
          this.authService.info$.obs.subscribe();
          this.authService.info$.next(token);
        })
      )
      .subscribe();
  }

  handleCloseDropdown(isClose: boolean) {
    if (isClose) {
      this.show = false;
    }
  }

  largePad = ["discover", "browse", "cart", "detail"];
  checkRouter(url: string) {
    if (this.largePad.find((item) => url.includes(item))) {
      this.paddingBottom = "pb-36";
    }
    if (url.includes("discover") || url === "/") {
      this.active = "discover";
    } else if (url.includes("browse")) {
      this.active = "browse";
    } else if (url.includes("detail")) {
      this.active = "detail";
    } else {
      this.active = "";
    }
    if (url.includes("cart")) {
      this.cartService.cartDetail$.subscribe((cart) => {
        if (cart.products.length > 0) {
          this.paddingBottom = "pb-14";
        } else {
          this.paddingBottom = "pb-36";
        }
      });
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginModalComponent, {
      width: "400px",
      data: {},
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log({ result });
    });
  }

  showAccountMenu(clickEvent: Event) {
    const target = clickEvent.target;
    this.isShowAccountMenu = true;
    console.log("Run");
    document.addEventListener("click", (e) => {
      // @ts-ignore
      console.log(target?.contains(e.target));
      // @ts-ignore
      if (!target?.contains(e.target)) {
        this.isShowAccountMenu = false;
      }
    });
  }

  logout() {
    this.authService.logout$.obs
      .pipe(
        tap(({ message }: any) => {
          if (message) {
            window.location.reload();
          }
        })
      )
      .subscribe();
    this.authService.logout$.next(this.authService.acccessToken);
  }
}
