import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CollectionService {
  topSaleUrl = "https://localhost:5000/api/collections/name";

  constructor(private http: HttpClient) {}

  private handleError(err: any): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

  getCollection(collections: string[]): Observable<any[]> {
    return this.http
      .get<any>(this.topSaleUrl + `?names=${JSON.stringify(collections)}`)
      .pipe(
        tap((data) => console.log("raw data", data)),
        catchError(this.handleError)
      );
  }
}
