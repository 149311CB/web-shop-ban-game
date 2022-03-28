import { Component, Input, OnInit } from "@angular/core";
import { StringService } from "src/app/string.service";

@Component({
  selector: "app-brief-info",
  templateUrl: "./brief-info.component.html",
  styleUrls: ["./brief-info.component.scss"],
})
export class BriefInfoComponent implements OnInit {
  @Input() product: any;

  constructor(public stringService: StringService) {}

  ngOnInit(): void {}
}
