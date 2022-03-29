import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { CartDetailComponent } from "./cart-detail/cart-detail.component";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { CartItemComponent } from './cart-detail/cart-item/cart-item.component';

@NgModule({
  declarations: [
    CartDetailComponent,
    CartItemComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterModule.forChild([{ path: "cart", component: CartDetailComponent }]),
  ],
})
export class CartModule {}
