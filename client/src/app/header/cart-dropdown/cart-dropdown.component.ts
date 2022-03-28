import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  Input,
} from "@angular/core";
import { fromEvent, Subscription, tap } from "rxjs";
import { ImageService } from "src/app/image.service";
import { ProductService } from "src/app/product.service";

@Component({
  selector: "app-cart-dropdown",
  templateUrl: "./cart-dropdown.component.html",
  styleUrls: ["./cart-dropdown.component.scss"],
})
export class CartDropdownComponent implements OnInit, OnDestroy {
  clickOutside$ = fromEvent(document, "click");
  clickOutsideSub: Subscription | undefined = undefined;
  @Output("closeDropdown") closeDropdown = new EventEmitter<boolean>(false);
  @Input() cartBriefSummary: any = undefined;

  constructor(
    public imageService: ImageService,
    public productService: ProductService
  ) {}

  ngOnInit(): void {
    this.clickOutsideSub = this.clickOutside$.subscribe((event) => {
      const dropdown = document.querySelector("app-cart-dropdown");
      if (dropdown) {
        if (!dropdown.contains(event.target as HTMLElement)) {
          this.closeDropdown.emit(true);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.clickOutsideSub?.unsubscribe();
  }
}
