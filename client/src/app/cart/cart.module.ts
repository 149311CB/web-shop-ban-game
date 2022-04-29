import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { CartDetailComponent } from "./cart-detail/cart-detail.component";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { CartItemComponent } from "./cart-detail/cart-item/cart-item.component";
import { FormsModule } from "@angular/forms";
import { LoadingPipe } from "../loading.pipe";

@NgModule({
  declarations: [CartDetailComponent, CartItemComponent, LoadingPipe],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    RouterModule.forChild([{ path: "cart", component: CartDetailComponent }]),
  ],
  providers: [LoadingPipe],
})
export class CartModule {}
