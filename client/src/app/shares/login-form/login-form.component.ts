import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription, tap } from "rxjs";
import { AuthService } from "src/app/auth.service";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent implements OnInit, OnDestroy {
  @Input() isRegister = false;
  @Output() registerEvent= new EventEmitter<boolean>(false);
  constructor(public authService: AuthService) {}
  subscribers: Subscription[] = [];

  ngOnInit(): void {
    this.subscribers.push(
      this.authService.login$
        .pipe(
          tap(({ success }: any) => {
            if (success) {
              window.location.href = "https://localhost:4200";
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
}
