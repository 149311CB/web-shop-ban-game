import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-success",
  templateUrl: "./success.component.html",
  styleUrls: ["./success.component.scss"],
})
export class SuccessComponent implements OnInit {
  order: any = null;
  constructor() {}

  ngOnInit(): void {
    const { order } = history.state;
    this.order = order;
  }
}
