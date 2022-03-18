import { Component, Input, OnInit } from "@angular/core";
import { GameDetail } from "../ProductDetailUtils";

@Component({
  selector: "app-game-carousel",
  templateUrl: "./game-carousel.component.html",
  styleUrls: ["./game-carousel.component.scss"],
})
export class GameCarouselComponent extends GameDetail implements OnInit {
  @Input() product: any;

  constructor() {
    super();
  }

  ngOnInit(): void {}
}
