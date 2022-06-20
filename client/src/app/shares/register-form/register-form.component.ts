import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "src/app/auth.service";
import { securePass } from "src/utils/validators";

@Component({
  selector: "app-register-form",
  templateUrl: "./register-form.component.html",
  styleUrls: ["./register-form.component.scss"],
})
export class RegisterFormComponent implements OnInit {
  @Output() registerEvent = new EventEmitter<boolean>();
  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  form = new FormGroup({
    email: new FormControl("", {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl("", {
      validators: [Validators.required, securePass()],
    }),
    confirmPass: new FormControl("", {
      validators: [Validators.required],
    }),
    firstName: new FormControl("", {
      validators: [Validators.required],
    }),
    lastName: new FormControl("", {
      validators: [Validators.required],
    }),
  });

  get email() {
    return this.form.controls["email"];
  }

  get password() {
    return this.form.controls["password"];
  }

  get firstName() {
    return this.form.controls["firstName"];
  }

  get lastName() {
    return this.form.controls["lastName"];
  }

  get confirmPass() {
    return this.form.controls["confirmPass"];
  }

  onSubmit() {
    this.authService.register(
      this.firstName.value,
      this.lastName.value,
      this.email.value,
      this.password.value,
      this.confirmPass.value,
      this.showMessage.bind(this)
    );
  }

  changeToLogin() {
    this.registerEvent.emit(false);
  }

  showMessage(message: string) {
    this._snackBar.open(message, "", {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 5000,
    });
  }

  toggleVisibility(element: HTMLInputElement) {
    if (element.type === "password") {
      element.type = "text";
    } else {
      element.type = "password";
    }
  }

  registerWithGoogle() {
    window.open("https://localhost:5000/api/users/login/google", "_self");
  }

  registerWithFacebook(){
    window.open("https://localhost:5000/api/users/login/facebook", "_self");
  }
}
