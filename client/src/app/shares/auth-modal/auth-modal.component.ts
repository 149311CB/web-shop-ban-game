import { HttpClient } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { concatMap, tap } from "rxjs";
import { AuthService } from "src/app/auth.service";
import { securePass } from "src/utils/validators";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-auth-modal",
  templateUrl: "./auth-modal.component.html",
  styleUrls: ["./auth-modal.component.scss"],
})
export class AuthModalComponent implements OnInit {
  constructor(
    public diaglogRef: MatDialogRef<AuthModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this.data.key === "email") {
      this.value.setValue(this.data.value);
    }
  }

  onNoClick(): void {
    this.diaglogRef.close();
  }

  form = new FormGroup({
    value: new FormControl(null, {
      validators: [
        Validators.required,
        this.data.key === "email" ? Validators.email : securePass(),
      ],
    }),
    password: new FormControl(null, {
      validators: [Validators.required],
    }),
    confirmPass: new FormControl(null, {
      validators: [Validators.required],
    }),
  });

  get value() {
    return this.form.controls["value"];
  }

  get password() {
    return this.form.controls["password"];
  }

  get confirmPass() {
    return this.form.controls["confirmPass"];
  }

  log() {
    console.log(this.form);
  }

  disabled = true;
  isDisable() {
    if (this.data.key === "email") {
      if (
        this.value?.errors?.["required"] ||
        this.value?.errors?.["email"] ||
        this.password?.errors?.["required"]
      ) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
      return;
    }

    if (
      this.value?.errors?.["required"] ||
      this.value?.errors?.["notSecure"] ||
      this.confirmPass?.errors?.["required"] ||
      this.password?.errors?.["required"]
    ) {
      this.disabled = true;
    } else {
      this.disabled = false;
    }
  }

  toggleVisibility(element: HTMLInputElement) {
    if (element.type === "password") {
      element.type = "text";
    } else {
      element.type = "password";
    }
  }

  confirmUpdate() {
    if (this.data.key === "email") {
      this.authService.refresh$
        .pipe(
          concatMap(({ token }: any) =>
            this.http
              .post(
                "https://localhost:5000/api/users/profile/update/email",
                {
                  email: this.value.value,
                  password: this.password.value,
                },
                { headers: { Authorization: `Bearer ${token}` } }
              )
              .pipe(this.showMessage())
          )
        )
        .subscribe();
    } else {
      this.authService.refresh$
        .pipe(
          concatMap(({ token }) =>
            this.http
              .post(
                "https://localhost:5000/api/users/profile/update/password",
                {
                  currentPassword: this.password.value,
                  newPassword: this.value.value,
                  confirmNewPass: this.confirmPass.value,
                },
                { headers: { Authorization: `Bearer ${token}` } }
              )
              .pipe(this.showMessage())
          )
        )
        .subscribe();
    }
  }

  showMessage() {
    return tap(({ message }: any) => {
      if (message === "success") {
        this._snackBar.open("Update success", "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 5000,
        });
      }
    });
  }
}
