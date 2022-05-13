import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  BehaviorSubject,
  concatMap,
  Observable,
  of,
  shareReplay,
  Subject,
  tap,
} from "rxjs";

type newItem = { _id: string; quantity: number };
@Injectable({
  providedIn: "root",
})
export class CartService {
  constructor(private http: HttpClient) {}

  private _cart: any = null;
  get cart(): any {
    return this._cart;
  }
  private cartDetailCoresponsedSubject = new BehaviorSubject<any>(0);
  cartDetailCoresponsedAction$ =
    this.cartDetailCoresponsedSubject.asObservable();

  private httpRequest = this.http.post(
    "http://localhost:5000/api/carts/active",
    {},
    {
      withCredentials: true,
    }
  );

  cartDetail$: Observable<any> = this.cartDetailCoresponsedAction$.pipe(
    concatMap((data) => {
      if (data === 2) {
        return of(this._cart);
      }
      return this.httpRequest;
    }),
    tap((data) => {
      console.log("cart detail", data);
      this._cart = data;
    }),
    shareReplay(1)
  );

  reloadIfEmpty() {
    if (this._cart !== null) {
      this.cartDetailCoresponsedSubject.next(1);
    }
  }

  private addToCartSubject = new Subject<newItem>();
  addToCartAction$ = this.addToCartSubject.asObservable().pipe(
    concatMap<any, Observable<any>>((data) =>
      this.http.post(
        "http://localhost:5000/api/carts/add",
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
      "http://localhost:5000/api/carts/qty/update",
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
        "http://localhost:5000/api/carts/remove",
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
