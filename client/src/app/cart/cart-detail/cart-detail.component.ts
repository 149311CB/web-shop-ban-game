import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { catchError, of, tap } from "rxjs";
import { AuthService } from "src/app/auth.service";
import { LoginModalComponent } from "src/app/shares/login-modal/login-modal.component";
import { CartService } from "../../cart.service";
import { ImageService } from "../../image.service";

@Component({
  selector: "app-cart-detail",
  templateUrl: "./cart-detail.component.html",
  styleUrls: ["./cart-detail.component.scss"],
})
export class CartDetailComponent implements OnInit {
  totalPrice = 0;
  cartDetail$ = this.cartService.cartDetail$.pipe(
    tap((cart) => {
      this.calculateTotalPrice(cart);
    }),
    catchError((_) => {
      return of({});
    })
  );

  constructor(
    private cartService: CartService,
    public imageService: ImageService,
    private dialog: MatDialog,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.reloadIfEmpty();
  }

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

  openDialog(): void {
    if (!this.authService.info) {
      const dialogRef = this.dialog.open(LoginModalComponent, {
        width: "400px",
        data: {},
      });
      dialogRef.afterClosed().subscribe((result) => {
        console.log({ result });
      });
    } else {
      this.router.navigateByUrl("/checkout");
    }
  }
}
