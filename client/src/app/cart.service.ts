import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  BehaviorSubject,
  combineLatestWith,
  concatMap,
  map,
  Observable,
  shareReplay,
  Subject,
  tap,
} from "rxjs";

type newItem = { _id: string; quantity: number };
@Injectable({
  providedIn: "root",
})
export class CartService {
  private cartDetailCoresponsedSubject = new BehaviorSubject<any>(0);
  cartDetailCoresponsedAction$ =
    this.cartDetailCoresponsedSubject.asObservable();

  cartDetail$: Observable<any> = this.cartDetailCoresponsedAction$.pipe(
    concatMap(() =>
      this.http.post(
        "https://localhost:5000/api/carts/active",
        {},
        {
          withCredentials: true,
        }
      )
    ),
    tap((data) => console.log("cart detail", data))
  );

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

  constructor(private http: HttpClient) {}

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

  removeFromCart(product: any) {
    return this.http
      .post(
        "https://localhost:5000/api/carts/remove",
        {
          product,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .pipe(
        tap(() => {
          this.cartDetailCoresponsedSubject.next(1);
        })
      );
  }
}
