import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { concatMap, tap } from "rxjs";
import { AuthService } from "src/app/auth.service";
import { securePass } from "src/utils/validators";

@Component({
  selector: "app-complete",
  templateUrl: "./complete.component.html",
  styleUrls: ["./complete.component.scss"],
})
export class CompleteComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  form = new FormGroup({
    password: new FormControl("", {
      validators: [Validators.required, securePass()],
    }),
    confirmPass: new FormControl("", {
      validators: [Validators.required],
    }),
  });

  get password() {
    return this.form.controls["password"];
  }

  get confirmPass() {
    return this.form.controls["confirmPass"];
  }

  onSubmit() {
    this.route.queryParams
      .pipe(
        concatMap(({ token }) =>
          this.http
            .post(
              `https://localhost:5000/api/users/create-pass?token=${token}`,
              {
                password: this.password.value,
                confirm_pass: this.confirmPass.value,
              }
            )
            .pipe(
              tap(({ message }: any) => {
                if (message === "successful") {
                  this.authService.refresh$.subscribe(() => {
                    window.location.href = "https://localhost:4200";
                  });
                }
              })
            )
        )
      )
      .subscribe();
  }
}
