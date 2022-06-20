import { AfterViewInit, Component, OnInit } from "@angular/core";
import { tap } from "rxjs";
import { CommonService } from "src/app/common.service";
import { OrderService } from "src/app/order-service.service";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.scss"],
})
export class OrderComponent implements OnInit, AfterViewInit {
  constructor(
    public orderService: OrderService,
    public commonService: CommonService
  ) {}

  ngAfterViewInit(): void {
    this.getAllOrder.next(0);
  }

  ngOnInit(): void {}

  getAllOrder = this.orderService.getAllOrder;
  allOrders$ = this.getAllOrder.obs.pipe(tap((data) => console.log(data)));

  orderProductListToString(productList: any[]) {
    if (productList.length < 2) {
      return productList[0].product.name;
    } else {
      return `${productList[0].product.name}; ${productList[1].product.name} ${
        productList.length > 2 ? "..." : ""
      }`;
    }
  }

  changePage(page: number) {
    this.getAllOrder.next(page - 1);
  }
}
