import { Component, Input, OnInit } from "@angular/core";
import { ImageService } from "src/app/image.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  @Input() products: any;
  constructor(public imageService: ImageService) {}

  ngOnInit(): void {}
  detach(element: HTMLElement) {
    document.addEventListener("click", (e) => {
      if (!element.contains(e.target as HTMLElement)) {
        this.products = [];
      }
    });
  }
}
