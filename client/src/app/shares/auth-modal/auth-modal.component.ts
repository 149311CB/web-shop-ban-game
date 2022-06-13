import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-auth-modal",
  templateUrl: "./auth-modal.component.html",
  styleUrls: ["./auth-modal.component.scss"],
})
export class AuthModalComponent implements OnInit {
  constructor(
    public diaglogRef: MatDialogRef<AuthModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.diaglogRef.close();
  }
}
