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

  ngOnInit(): void {
    console.log("uhhh");
  }

  shift(collections: any[]) {
    console.log([collections[0], ...collections.splice(1)])
    return [collections[0], ...collections.splice(1)];
  }
}
