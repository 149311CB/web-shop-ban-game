import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProductDetail(id: string): Observable<any> {
    const url = `https://localhost:5000/api/products/games/${id}`;
    return this.http.get<any>(url).pipe(tap((data) => console.log(data)));
  }
}
