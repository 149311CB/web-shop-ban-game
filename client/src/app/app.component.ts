import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "client";
  className = "w-[95%] sm:w-11/12 md:w-4/5 m-auto pt-36";
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((e) => {
        const event = e as NavigationEnd;
        this.checkRouter(event.url);
      });
  }
  checkRouter(url: string) {
    if (!url.includes("discover") || url !== "/" || !url.includes("browse")) {
      this.className = "w-[95%] sm:w-11/12 md:w-4/5 m-auto pt-14";
    }
  }
}
