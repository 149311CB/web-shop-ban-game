import { Component, OnInit, Input } from "@angular/core";
import { animateTo } from "src/utils/animateTo";
function uuidv4() {
  // @ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}
@Component({
  selector: "expand-input",
  templateUrl: "./expand-input.component.html",
  styleUrls: ["./expand-input.component.scss"],
})
export class ExpandInputComponent implements OnInit {
  public readonly id = "search-field-" + uuidv4();
  @Input() default = "150px";
  @Input() expanded = "230px";
  @Input() icon?: string;
  @Input() iconPos?: "left" | "right" = "left";
  @Input() onChange?: (event: Event) => void;

  constructor() {}

  ngOnInit(): void {}

  expand() {
    const el = document.querySelector(`.${this.id}`);
    if (el) {
      animateTo(el, [{ width: this.expanded }], {
        duration: 150,
        easing: "ease-in-out",
        fill: "forwards",
      });
    }
  }

  narrowDown() {
    const el = document.querySelector(`.${this.id}`);
    if (el) {
      animateTo(el, [{ width: this.default }], {
        duration: 150,
        easing: "ease-in-out",
        fill: "forwards",
      });
    }
  }

  onInputChange(event: Event) {
    this.onChange?.(event);
  }
}
