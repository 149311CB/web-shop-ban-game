import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserComponent } from "./user.component";
import { AccountComponent } from "./account/account.component";
import { ProfileComponent } from "./profile/profile.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatDatepickerModule } from "@angular/material/datepicker";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from "@angular/material/core";
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from "@angular/material-moment-adapter";
import { MatButtonModule } from "@angular/material/button";
import { OrderComponent } from "./order/order.component";
import { OrderDetailComponent } from "./order-detail/order-detail.component";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { CompleteComponent } from "./auth/complete/complete.component";

@NgModule({
  declarations: [
    UserComponent,
    AccountComponent,
    ProfileComponent,
    OrderComponent,
    OrderDetailComponent,
    CompleteComponent,
  ],
  imports: [
    MatDatepickerModule,
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatSnackBarModule,
    RouterModule.forChild([
      { path: "user", redirectTo: "user/profile", pathMatch: "full" },
      { path: "user/profile", component: ProfileComponent },
      { path: "user/order", component: OrderComponent },
      { path: "user/order/detail/:id", component: OrderDetailComponent },
      { path: "auth/complete", component: CompleteComponent },
    ]),
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class UserModule {}
