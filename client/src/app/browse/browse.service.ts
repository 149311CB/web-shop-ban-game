import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, concatMap, Observable, tap } from "rxjs";
import { chainQueries } from "src/utils/chainQuery";

export interface IGameFilter {
  currentPage: number;
  keyword: string;
  filters: string[];
}

@Injectable({
  providedIn: "root",
})
export class BrowseService {
  constructor(private http: HttpClient) {}

  private gamesCoresponsedSubject = new BehaviorSubject<IGameFilter>({
    currentPage: 0,
    filters: [],
    keyword: "",
  });
  gameCoresponsedAction$ = this.gamesCoresponsedSubject.asObservable();
  games$: Observable<any> = this.gameCoresponsedAction$
    .pipe(
      concatMap((data) => {
        return this.makeRequest(data);
      })
    )
    .pipe(tap((games) => console.log({ games })));

  private makeRequest({ currentPage, keyword, filters }: IGameFilter) {
    const url = chainQueries("https://localhost:5000/api/products/games/all", {
      limit: 20,
      skip: currentPage,
    });
    return this.http.post(
      url,
      {
        limit: 20,
        skip: currentPage,
        keyword: keyword,
        filters: filters.length > 0 ? filters : null,
      },
      {
        withCredentials: true,
      }
    );
  }

  getGame(options: IGameFilter) {
    this.gamesCoresponsedSubject.next(options);
  }
}
