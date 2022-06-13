import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { AuthService } from "src/app/auth.service";

@Component({
  selector: "app-register-form",
  templateUrl: "./register-form.component.html",
  styleUrls: ["./register-form.component.scss"],
})
export class RegisterFormComponent implements OnInit {
  @Output() registerEvent = new EventEmitter<boolean>();
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  form = new FormGroup({
    email: new FormControl("", {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl("", {
      validators: [Validators.required, this.securePass()],
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

  securePass(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return {
        notSecure:
          !/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{12,}$/.test(
            control.value
          ),
      };
    };
  }

  isMatch(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return {
        isMatch: this.password.value === control.value,
      };
    };
  }

  onSubmit() {
    this.authService.register(
      this.firstName.value,
      this.lastName.value,
      this.email.value,
      this.password.value,
      this.confirmPass.value
    );
  }

  changeToLogin() {
    this.registerEvent.emit(false);
  }
}
