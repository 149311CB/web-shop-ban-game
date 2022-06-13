import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  BehaviorSubject,
  concatMap,
  map,
  Observable,
  of,
  shareReplay,
  Subject,
  tap,
} from "rxjs";
import { AuthService } from "./auth.service";

type newItem = { _id: string; quantity: number };
@Injectable({
  providedIn: "root",
})
export class CartService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  private _cart: any = null;
  get cart(): any {
    return this._cart;
  }
  private cartDetailCoresponsedSubject = new BehaviorSubject<any>(0);
  cartDetailCoresponsedAction$ =
    this.cartDetailCoresponsedSubject.asObservable();

  cartDetail$: Observable<any> = this.cartDetailCoresponsedAction$.pipe(
    concatMap((data) => {
      return this.authService.refresh$.pipe(map(({ token }) => [token, data]));
    }),
    concatMap(([token, data]) => {
      if (data === 2) {
        return of(this._cart);
      }
      return this.http.post(
        this.getPrefixRoute() + "/active",
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }),
    tap((data) => {
      console.log("cart detail", data);
      if (data._id) {
        this._cart = data;
      } else {
        this._cart = null;
      }
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
        this.getPrefixRoute() + "/add",
        {
          product: data,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.authService.acccessToken}`,
          },
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
      this.getPrefixRoute() + "/qty/update",
      { product },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authService.acccessToken}`,
        },
      }
    );
  }

  removeFromCart(product: any) {
    return this.http
      .post(
        this.getPrefixRoute() + "/carts/remove",
        {
          product,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.authService.acccessToken}`,
          },
        }
      )
      .pipe(
        tap(() => {
          this.cartDetailCoresponsedSubject.next(1);
        })
      );
  }

  getPrefixRoute() {
    console.log({ accessToken: this.authService.acccessToken });
    if (this.authService.acccessToken) {
      return "http://localhost:5000/api/carts/auth";
    } else {
      return "http://localhost:5000/api/carts";
    }
  }
}
