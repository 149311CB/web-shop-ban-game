import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { animateTo } from "src/utils/animateTo";
import { AnimationInterval } from "src/utils/animationInterval";
import { ProductService } from "../product.service";
import { marked } from "marked";
import { GameDetail } from "./ProductDetailUtils";

@Component({
  selector: "app-game-detail",
  templateUrl: "./game-detail.component.html",
  styleUrls: ["./game-detail.component.scss"],
})
export class GameDetailComponent
  extends GameDetail
  implements OnInit, AfterViewInit, OnDestroy
{
  controller = new AbortController();
  animationInterval: AnimationInterval | undefined;
  product$ = this.getProductDetail();

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    super();
  }

  ngOnDestroy(): void {
    if (this.animationInterval) {
      this.animationInterval.end();
      this.animationInterval.clear();
    }
  }

  ngAfterViewInit(): void {
    this.product$.subscribe(() => {
      this.animate();
      this.descriptionColorize();
    });
  }

  ngOnInit(): void {}

  animate() {
    const carousel = document.querySelector(
      ".game-carousel .big-thumbnail"
    ) as HTMLElement;
    const smallPreviewItem = document.querySelectorAll(".small-preview-item");
    if (carousel) {
      const reset = carousel.querySelectorAll("li").length;
      let currentIndex = 0;
      this.animationInterval = new AnimationInterval(
        5000,
        this.controller,
        () => {
          if (currentIndex === 0) {
            smallPreviewItem
              .item(smallPreviewItem.length - 1)
              .classList.remove("active");
          } else {
            smallPreviewItem.item(currentIndex - 1).classList.remove("active");
          }
          smallPreviewItem.item(currentIndex).classList.add("active");
          this.slideToNext(carousel, currentIndex);
          if (currentIndex !== reset - 1) {
            currentIndex += 1;
          } else {
            currentIndex = 0;
          }
        },
        true
      ).start();
    }
  }

  slideToNext(carousel: HTMLElement, currentIndex: number) {
    animateTo(
      carousel,
      [
        {
          transform: `translateX(${currentIndex !== 0 ? "-" : ""}${
            currentIndex * 100
          }%)`,
        },
      ],
      {
        easing: "ease-in",
        duration: 1000,
        fill: "forwards",
      },
      this.controller.signal
    );
  }

  getProductDetail() {
    let gameId = "";
    this.route.params.subscribe((values) => (gameId = values["id"]));
    return this.productService.getProductDetail(gameId);
  }

  getLogo(images: any[]) {
    return images.find((image) => image.type === "logo" && image.url !== "");
  }

  formatTag(tag: string, trailing: boolean) {
    const end = trailing ? ", " : "";
    return (
      tag.substring(0, 1).toUpperCase() + tag.substring(1, tag.length) + end
    );
  }

  getMarked(text: string) {
    const parsedMark = marked.parse(text);
    return parsedMark;
  }

  descriptionColorize() {
    const items = document.querySelector(".description")?.querySelectorAll("*");
    items?.forEach((item) => {
      (item as HTMLElement).style.color = "hsla(0, 0%, 200%, 0.6)";
    });
  }
}
