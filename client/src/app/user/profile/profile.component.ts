import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import * as moment from "moment";
import { concatMap, tap } from "rxjs";
import { AuthService } from "src/app/auth.service";
import { AuthModalComponent } from "src/app/shares/auth-modal/auth-modal.component";
import { securePass } from "src/utils/validators";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.authService.info$.obs
      .pipe(
        tap((data) => {
          this.form.controls["email"].setValue(data.email);
          this.personalDetailForm.controls["firstName"].setValue(
            data.first_name
          );
          this.personalDetailForm.controls["lastName"].setValue(data.last_name);
          this.personalDetailForm.controls["phoneNumber"].setValue(
            data.phone_number
          );
        })
      )
      .subscribe();
  }

  form = new FormGroup({
    email: new FormControl("", {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl(null, {
      validators: [Validators.required, securePass()],
    }),
  });

  get email() {
    return this.form.controls["email"];
  }

  get password() {
    return this.form.controls["password"];
  }

  personalDetailForm = new FormGroup({
    firstName: new FormControl("", {
      validators: [Validators.required],
    }),
    lastName: new FormControl("", {
      validators: [Validators.required],
    }),
    phoneNumber: new FormControl(""),
    birthday: new FormControl(moment([2022, 5, 1])),
  });

  get firstName() {
    return this.personalDetailForm.controls["firstName"];
  }

  get lastName() {
    return this.personalDetailForm.controls["lastName"];
  }

  get birthday() {
    return this.personalDetailForm.controls["birthday"];
  }

  get phoneNumber() {
    return this.personalDetailForm.controls["phoneNumber"];
  }

  openDialog({ key, value }: { key: string; value: string }): void {
    console.log("open");
    const dialogRef = this.dialog.open(AuthModalComponent, {
      width: "400px",
      data: { key, value },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log({ result });
    });
  }

  updatePersonalDetail() {
    this.authService.refresh$
      .pipe(
        concatMap(({ token }) =>
          this.http
            .post(
              "https://localhost:5000/api/users/profile/personal-details/update",
              {
                firstName: this.firstName.value,
                lastName: this.lastName.value,
                birthday: this.birthday.value,
                phoneNumber: this.phoneNumber.value,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            )
            .pipe(this.showMessage())
        )
      )
      .subscribe();
  }
  showMessage() {
    return tap(({ message }: any) => {
      if (message === "successful") {
        this._snackBar.open("Update success", "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 5000,
        });
      }
    });
  }
}
