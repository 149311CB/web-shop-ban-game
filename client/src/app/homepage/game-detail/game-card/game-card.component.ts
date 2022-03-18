import { Component, Input, OnInit } from "@angular/core";
import { GameDetail } from "../ProductDetailUtils";

@Component({
  selector: "app-game-card",
  templateUrl: "./game-card.component.html",
  styleUrls: ["./game-card.component.scss"],
})
export class GameCardComponent extends GameDetail implements OnInit {
  @Input() product: any;

  constructor() {
    super();
  }

  ngOnInit(): void {}
}
