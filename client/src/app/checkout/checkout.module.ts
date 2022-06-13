import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CheckoutComponent } from "./checkout.component";
import { RouterModule } from "@angular/router";
import { CdkAccordionModule } from "@angular/cdk/accordion";
import { MatButtonModule } from "@angular/material/button";
import { SuccessComponent } from "./success/success.component";

@NgModule({
  declarations: [CheckoutComponent, SuccessComponent],
  imports: [
    CommonModule,
    CdkAccordionModule,
    MatButtonModule,
    RouterModule.forChild([
      { path: "checkout", component: CheckoutComponent },
      { path: "success", component: SuccessComponent },
    ]),
  ],
})
export class CheckoutModule {}
