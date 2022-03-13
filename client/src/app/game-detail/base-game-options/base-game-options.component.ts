import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-base-game-options",
  templateUrl: "./base-game-options.component.html",
  styleUrls: ["./base-game-options.component.scss"],
})
export class BaseGameOptionsComponent implements OnInit {
  @Input() product: any;

  constructor() {}

  ngOnInit(): void {}
}
