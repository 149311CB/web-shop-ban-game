import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  getProductReviews(id: string): Observable<any> {
    const url = `https://localhost:5000/api/reviews/all?gameId=${id}`;
    return this.http.get<any>(url).pipe(
      tap((data) => {
        console.log('reviews', data);
      })
    );
  }
}
