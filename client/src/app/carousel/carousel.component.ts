import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { map, Subscription } from "rxjs";
import { animateTo } from "src/utils/animateTo";
import { AnimationInterval } from "src/utils/animationInterval";
import { CollectionService } from "../collection.service";

@Component({
  selector: "carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.scss"],
})
export class CarouselComponent
  implements OnInit, AfterViewChecked, AfterViewInit, OnDestroy
{
  controller = new AbortController();
  animationInterval: AnimationInterval | undefined;
  subscribers: Subscription[] = [];
  topSales$ = this.collectionService.getCollection(["top sale"]).pipe(
    map((collections) => ({
      ...collections[0],
      list_game: collections[0].list_game.slice(0, 6),
    }))
  );

  constructor(private collectionService: CollectionService) {}

  ngOnDestroy(): void {
    if (this.animationInterval) {
      this.animationInterval.end();
      this.animationInterval.clear();
    }
    this.subscribers.forEach((subscriber) => {
      subscriber.unsubscribe();
    });
  }

  ngAfterViewInit(): void {
    this.subscribers.push(this.topSales$.subscribe(() => this.animate()));
  }

  ngAfterViewChecked(): void {
    const smallPanesEls = document.querySelectorAll(".small-panes-item");
    if (smallPanesEls) {
      const smallPanesArr = Array.from(smallPanesEls);
      smallPanesEls.forEach((item: any) => {
        item.style.height = `${100 / smallPanesArr.length}%`;
      });
    }
  }

  ngOnInit(): void {}

  animate() {
    const carousel = document.querySelector(
      ".top-game-preview-list"
    ) as HTMLElement;
    const smallPanes = document.querySelectorAll(".small-panes-item");
    if (carousel && smallPanes) {
      const reset = carousel.querySelectorAll("li").length;
      const smallPanesArr = Array.from(smallPanes);
      let currentIndex = 0;
      this.animationInterval = new AnimationInterval(
        5000,
        this.controller,
        (_: number) => {
          const prevItem = smallPanesArr[currentIndex - 1] as HTMLElement;
          if (prevItem) {
            prevItem.style.backgroundColor = "unset";
          } else {
            (
              smallPanesArr[smallPanesArr.length - 1] as HTMLElement
            ).style.backgroundColor = "unset";
          }

          const currentItem = smallPanesArr[currentIndex] as HTMLElement;
          currentItem.style.backgroundColor = "#2C2C2C";

          const cover = currentItem.querySelector(".cover") as HTMLDivElement;
          const image = currentItem.querySelector("img") as HTMLImageElement;
          if (cover) {
            this.expandWidth(cover);
          }
          if (image) {
            this.scaleImage(image);
          }
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

  scaleImage(image: HTMLImageElement) {
    animateTo(
      image,
      [
        { transform: `scale(1)` },
        { transform: `scale(1.1)` },
        { transform: `scale(1)` },
      ],
      {
        duration: 500,
        fill: "forwards",
        easing: "cubic-bezier(0.33, 0.00, 0.67, 1.00)",
      },
      this.controller.signal
    );
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
        duration: 1500,
        fill: "forwards",
      },
      this.controller.signal
    );
  }

  expandWidth(cover: HTMLDivElement) {
    animateTo(
      cover,
      [{ width: "100%" }],
      {
        easing: "ease-in-out",
        duration: 5000,
      },
      this.controller.signal
    );
  }

  getLandscape(images: any[]) {
    return images.filter(
      (image) => image.type === "landscape" && image.url !== ""
    );
  }
}
