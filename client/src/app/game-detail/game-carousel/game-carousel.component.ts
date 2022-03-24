import { Component, Input, OnInit } from "@angular/core";
import { ImageService } from "src/app/image.service";

@Component({
  selector: "app-game-carousel",
  templateUrl: "./game-carousel.component.html",
  styleUrls: ["./game-carousel.component.scss"],
})
export class GameCarouselComponent implements OnInit {
  @Input() product: any;

  constructor(public imageService: ImageService) {}

  ngOnInit(): void {}
}
