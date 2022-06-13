import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AuthService } from "src/app/auth.service";

@Component({
  selector: "app-login-modal",
  templateUrl: "./login-modal.component.html",
  styleUrls: ["./login-modal.component.scss"],
})
export class LoginModalComponent implements OnInit, OnDestroy {
  constructor(
    public diaglogRef: MatDialogRef<LoginModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public authService: AuthService
  ) {}

  isRegister = false;

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  onNoClick(): void {
    this.diaglogRef.close();
  }

  switchToRegister(value: any) {
    console.log({ value });
    this.isRegister = value;
  }
}
