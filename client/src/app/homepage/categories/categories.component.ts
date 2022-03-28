import { Component, OnInit } from "@angular/core";
import { CollectionService } from "../../collection.service";

@Component({
  selector: "categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"],
})
export class CategoriesComponent implements OnInit {
  collections$ = this.collectionService.getCollection([
    "top sale",
    "new release",
    "most popular",
    "recently update",
  ]);
  constructor(private collectionService: CollectionService) {}

  ngOnInit(): void {}
}
