import { Component, Input, OnInit } from "@angular/core";
import { ImageService } from "src/app/image.service";

@Component({
  selector: "app-detail-game-card",
  templateUrl: "./game-card.component.html",
  styleUrls: ["./game-card.component.scss"],
})
export class DetailGameCardComponent implements OnInit {
  @Input() product: any;

  constructor(public imageService: ImageService) {}

  ngOnInit(): void {}
}
