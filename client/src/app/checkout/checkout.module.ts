import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CheckoutComponent } from "./checkout.component";
import { RouterModule } from "@angular/router";
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    CdkAccordionModule,
    MatButtonModule,
    RouterModule.forChild([{ path: "checkout", component: CheckoutComponent }]),
  ],
})
export class CheckoutModule {}
