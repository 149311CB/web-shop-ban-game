import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, concatMap, of, shareReplay, Subject, tap } from "rxjs";
import { createSubjectObs } from "src/utils/actionObs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private _acccessToken: string | null = null;
  private _info: any = null;
  get acccessToken() {
    return this._acccessToken;
  }
  get info() {
    return this._info;
  }

  private loginSub = new Subject();
  private loginActionObsction$ = this.loginSub.asObservable();
  login$ = this.loginActionObsction$.pipe(
    concatMap(({ email, password }: any) => {
      return this.http
        .post(
          "https://localhost:5000/api/users/login",
          {
            email: email,
            password: password,
          },
          {
            withCredentials: true,
          }
        )
        .pipe(catchError((err) => of({})));
    }),
    // concatMap(({ success }: any) => {
    //   if (success) {
    //     return this.refresh$;
    //   }
    //   return of({});
    // }),
    // tap(({ token }) => {
    //   if (token) {
    //     window.location.reload();
    //   }
    // }),
    shareReplay(1)
  );

  refresh$ = this.http
    .post("https://localhost:5000/api/users/token/refresh", null, {
      withCredentials: true,
    })
    .pipe(
      tap(({ token }: any) => {
        this._acccessToken = token;
      }),
      shareReplay(1)
    );

  login(email: string, password: string) {
    this.loginSub.next({ email, password });
  }

  info$ = createSubjectObs((token) => {
    return this.http
      .post("https://localhost:5000/api/users/details", null, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        tap((data) => {
          this._info = data;
        })
      );
  });

  logout$ = createSubjectObs((token) => {
    return this.http.get("https://localhost:5000/api/users/logout", {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  });

  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPass: string,
    callback: Function
  ) {
    this.http
      .post("https://localhost:5000/api/users/register", {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        confirm_pass: confirmPass,
      })
      .pipe(
        tap(({ message }: any) => {
          if (message === "successful") {
            callback("Signup successful");
            this.login$.subscribe();
            this.login(email, password);
            setTimeout(() => {
              window.location.href = "https://localhost:4200";
            }, 3000);
          } else {
            callback("Signup failed");
          }
        })
      )
      .subscribe();
  }
}
