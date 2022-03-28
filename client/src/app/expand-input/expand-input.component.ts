import { Component, OnInit, Input } from "@angular/core";
import { animateTo } from "src/utils/animateTo";

@Component({
  selector: "expand-input",
  templateUrl: "./expand-input.component.html",
  styleUrls: ["./expand-input.component.scss"],
})
export class ExpandInputComponent implements OnInit {
  @Input() default = "150px";
  @Input() expanded = "230px";
  @Input() icon?: string;
  @Input() iconPos?: "left" | "right" = "left";

  constructor() {}

  ngOnInit(): void {}

  expand() {
    const el = document.querySelector(".search-field");
    if (el) {
      animateTo(el, [{ width: this.expanded }], {
        duration: 150,
        easing: "ease-in-out",
        fill: "forwards",
      });
    }
  }

  narrowDown() {
    const el = document.querySelector(".search-field");
    if (el) {
      animateTo(el, [{ width: this.default }], {
        duration: 150,
        easing: "ease-in-out",
        fill: "forwards",
      });
    }
  }
}
