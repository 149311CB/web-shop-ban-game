import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subscription, tap } from "rxjs";
import { AuthService } from "src/app/auth.service";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent implements OnInit, OnDestroy {
  @Input() isRegister = false;
  @Output() registerEvent = new EventEmitter<boolean>(false);
  constructor(
    public authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}
  subscribers: Subscription[] = [];

  ngOnInit(): void {
    this.subscribers.push(
      this.authService.login$
        .pipe(
          tap(({ success }: any) => {
            if (success) {
              this.showMessage("Login successful");
              setTimeout(() => {
                window.location.href = "https://localhost:4200";
              }, 3000);
            } else {
              this.showMessage("Login failed");
            }
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscribers.forEach((subscriber) => {
      subscriber.unsubscribe();
    });
  }

  form = new FormGroup({
    email: new FormControl("", {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl("", {
      validators: [Validators.required],
    }),
  });

  get email() {
    return this.form.controls["email"];
  }

  get password() {
    return this.form.controls["password"];
  }

  onSubmit() {
    this.authService.login(this.email.value, this.password.value);
  }

  changeToRegister() {
    this.registerEvent.emit(true);
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

  logginWithFacebook() {
    window.open("https://localhost:5000/api/users/login/facebook", "_self");
  }

  loginWithGoogle() {
    window.open("https://localhost:5000/api/users/login/google", "_self");
  }
}
