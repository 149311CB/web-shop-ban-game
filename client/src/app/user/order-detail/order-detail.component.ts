import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ImageService } from "src/app/image.service";
import { OrderService } from "src/app/order-service.service";

@Component({
  selector: "app-order-detail",
  templateUrl: "./order-detail.component.html",
  styleUrls: ["./order-detail.component.scss"],
})
export class OrderDetailComponent implements OnInit, AfterViewInit {
  constructor(
    public orderService: OrderService,
    private route: ActivatedRoute,
    public imageService: ImageService
  ) {}
  ngAfterViewInit(): void {
    this.route.params.subscribe((params) =>
      this.orderDetail.next(params["id"])
    );
  }

  ngOnInit(): void {}

  showKey: string = "*******************************";
  orderDetail = this.orderService.orderDetail;
  orderDetail$ = this.orderDetail.obs;

  toggleKey(key: any) {
    if (this.showKey.includes("*****")) {
      this.showKey = key;
    } else {
      this.showKey = "*******************************";
    }
  }

  copyToClipBoard = (key: any) => {
    navigator.clipboard.writeText(key);
  };
}
