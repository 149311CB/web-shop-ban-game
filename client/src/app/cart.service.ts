import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { concatMap, Observable, Subject, tap } from "rxjs";

type newItem = { _id: string; quantity: number };
@Injectable({
  providedIn: "root",
})
export class CartService {
  cartDetail$: Observable<any> = this.http
    .post(
      "https://localhost:5000/api/carts/active",
      {},
      {
        withCredentials: true,
      }
    )
    .pipe(tap((data) => console.log("cart detail", data)));

  constructor(private http: HttpClient) {}

  private addToCartSubject = new Subject<newItem>();
  addToCartAction$ = this.addToCartSubject.asObservable().pipe(
    concatMap<any, Observable<any>>((data) =>
      this.http.post(
        "https://localhost:5000/api/carts/add",
        {
          product: data,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
    ),
    tap((respone) => console.log("add to cart response", respone))
  );

  addToCart(product: newItem) {
    this.addToCartSubject.next(product);
  }

  updateQuantity(product: any) {
    return this.http.post(
      "https://localhost:5000/api/carts/qty/update",
      { product },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
