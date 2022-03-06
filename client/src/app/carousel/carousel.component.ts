import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { map, Subscription } from "rxjs";
import { animateTo } from "src/utils/animateTo";
import { animationInterval } from "src/utils/animationInterval";
import { CollectionService } from "../collection.service";

@Component({
  selector: "carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.scss"],
})
export class CarouselComponent
  implements OnInit, AfterViewChecked, AfterViewInit, OnDestroy
{
  subscribers: Subscription[] = [];
  topSales$ = this.collectionService.getCollection(["top sale"]).pipe(
    map((collections) => ({
      ...collections[0],
      list_game: collections[0].list_game.slice(0, 6),
    }))
  );

  constructor(private collectionService: CollectionService) {}

  ngOnDestroy(): void {
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
    const carousel = document.querySelector(".top-game-preview-list");
    const smallPanes = document.querySelectorAll(".small-panes-item");
    if (carousel && smallPanes) {
      const reset = carousel.querySelectorAll("li").length;
      const smallPanesArr = Array.from(smallPanes);
      let currentItem = 0;
      animationInterval(5000, new AbortController(), () => {
        if (currentItem !== reset - 1) {
          currentItem += 1;
        } else {
          currentItem = 0;
        }
        const cover = smallPanesArr[currentItem].querySelector(".cover");
        const image = smallPanesArr[currentItem].querySelector("img");
        animateTo(
          carousel,
          [
            {
              transform: `translateX(${currentItem !== 0 ? "-" : ""}${
                currentItem * 100
              }%)`,
            },
          ],
          {
            easing: "ease-in-out",
            duration: 1500,
            fill: "forwards",
          }
        );
      });
    }
  }
}
