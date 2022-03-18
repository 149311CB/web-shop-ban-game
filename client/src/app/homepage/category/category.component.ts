import { ChangeDetectionStrategy } from "@angular/core";
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";

@Component({
  selector: "category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent implements OnInit, OnChanges {
  @Input() collection: any;
  name = "";
  listGame: any[] = [];

  constructor() {}
  ngOnChanges(_: SimpleChanges): void {
    this.name =
      this.collection.name[0].toUpperCase() + this.collection.name.slice(1);
    this.listGame = this.collection.list_game.slice(0, 5);
  }

  ngOnInit(): void {}
}
