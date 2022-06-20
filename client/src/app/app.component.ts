import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter, tap } from "rxjs";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "client";
  className = "";
  isUser = false;
  endpoint = "/";

  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((e) => {
        const event = e as NavigationEnd;
        this.endpoint = event.url;
        if (event.url.includes("user")) {
          this.isUser = true;
        } else {
          this.isUser = false;
        }
      });
    this.refreshTokenInterval();
  }

  refreshTokenInterval() {
    this.authService.refresh$
      .pipe(
        tap(({ token }) => {
          if (token) {
            setTimeout(() => {
              this.refreshTokenInterval();
            }, 5 * 60 * 1000);
          }
        })
      )
      .subscribe();
  }
}
