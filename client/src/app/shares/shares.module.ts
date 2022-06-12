import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GameCardComponent } from "./game-card/game-card.component";
import { RouterModule } from "@angular/router";
import { ExpandInputComponent } from "./expand-input/expand-input.component";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { LoginModalComponent } from "./login-modal/login-modal.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthModalComponent } from "./auth-modal/auth-modal.component";
import { LoginFormComponent } from "./login-form/login-form.component";
import { RegisterFormComponent } from "./register-form/register-form.component";

@NgModule({
  declarations: [
    GameCardComponent,
    ExpandInputComponent,
    LoginModalComponent,
    AuthModalComponent,
    LoginFormComponent,
    RegisterFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  exports: [GameCardComponent, ExpandInputComponent],
})
export class SharesModule {}
