import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "../product.service";

@Component({
  selector: "app-game-detail",
  templateUrl: "./game-detail.component.html",
  styleUrls: ["./game-detail.component.scss"],
})
export class GameDetailComponent implements OnInit {
  product$ = this.getProductDetail();

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {}

  getProductDetail() {
    let gameId = "";
    this.route.params.subscribe((values) => (gameId = values["id"]));
    return this.productService.getProductDetail(gameId);
  }

  getLandscape(images: any[]) {
    return images.filter(
      (image) => image.type === "landscape" && image.url !== ""
    );
  }

  getLogo(images: any[]) {
    return images.find((image) => image.type === "logo" && image.url !== "");
  }

  camelCase(text: string) {
    return text[0].toUpperCase() + text.slice(1);
  }
}
