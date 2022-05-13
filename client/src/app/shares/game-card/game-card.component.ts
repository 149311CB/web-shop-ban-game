import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "game-card",
  templateUrl: "./game-card.component.html",
  styleUrls: ["./game-card.component.scss"],
})
export class GameCardComponent implements OnInit {
  @Input() game: any;
  constructor() {}

  ngOnInit(): void {}

  getPortrait(): string {
    return this.game.images.find((img: any) => {
      return img.type === "portrait";
    })?.url;
  }
}
