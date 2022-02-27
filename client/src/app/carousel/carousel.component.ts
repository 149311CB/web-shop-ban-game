import {
  AfterViewChecked,
  Component,
  OnInit,
} from "@angular/core";
import { map } from "rxjs";
import { CollectionService } from "../collection.service";

@Component({
  selector: "carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.scss"],
})
export class CarouselComponent implements OnInit, AfterViewChecked {
  topSales$ = this.collectionService.getCollection(["top sale"]).pipe(
    map((collections) => ({
      ...collections[0],
      list_game: collections[0].list_game.slice(0, 6),
    })),
  );

  constructor(private collectionService: CollectionService) {}

  ngAfterViewChecked(): void {
    const smallPanesEls = document.querySelectorAll(".small-panes-item");
    console.log(smallPanesEls);
    if (smallPanesEls) {
      const smallPanesArr = Array.from(smallPanesEls);
      smallPanesEls.forEach((item: any) => {
        item.style.height = `${100 / smallPanesArr.length}%`;
      });
    }
  }

  ngOnInit(): void {}
}
