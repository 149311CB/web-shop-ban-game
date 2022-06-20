import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { concatMap } from "rxjs";
import { createSubjectObs } from "src/utils/actionObs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  constructor(public http: HttpClient, public authService: AuthService) {}

  getAllOrder = createSubjectObs((currentPage: number) => {
    return this.authService.refresh$.pipe(
      concatMap(({ token }) =>
        this.http.get(
          `https://localhost:5000/api/orders/user/all?limit=10&skip=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      )
    );
  });

  orderDetail = createSubjectObs((id: string) => {
    return this.authService.refresh$.pipe(
      concatMap(({ token }) =>
        this.http.get(`https://localhost:5000/api/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      )
    );
  });
}
