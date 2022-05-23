import { Component, OnInit } from "@angular/core";
import { tap } from "rxjs";
import { BrowseService, IGameFilter } from "./browse.service";

@Component({
  selector: "app-browse",
  templateUrl: "./browse.component.html",
  styleUrls: ["./browse.component.scss"],
})
export class BrowseComponent implements OnInit {
  constructor(private browseService: BrowseService) {
    this.onSearchChange = this.onSearchChange.bind(this);
  }
  ngOnInit(): void {}
  config: IGameFilter = {
    currentPage: 0,
    keyword: "",
    filters: [],
  };
  flag: NodeJS.Timeout | undefined;

  categories = categories;
  games$ = this.browseService.games$.pipe(
    tap(() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" }))
  );
  onPageChange(newPage: number) {
    this.browseService.getGame({
      currentPage: newPage - 1,
      keyword: "",
      filters: [],
    });
  }

  getFilter(isActive: boolean, category: { name: string }) {
    if (isActive) {
      return this.config.filters.filter((tag) => tag !== category.name);
    }
    return [...this.config.filters, category.name];
  }

  toggleActive(event: MouseEvent, category: { name: string }) {
    const target = event.target as HTMLElement;
    target.classList.toggle("active");
    target.querySelector("mat-icon")?.classList.toggle("!hidden");
    const filters = this.getFilter(
      !target.classList.contains("active"),
      category
    );
    this.config.filters = filters;
    this.browseService.getGame({
      ...this.config,
      filters: filters,
    });
  }

  onSearchChange(event: Event) {
    if (this.flag) {
      clearTimeout(this.flag);
    }
    const target = event.target as HTMLInputElement;
    this.config.keyword = target.value;
    this.flag = setTimeout(() => {
      this.browseService.getGame({ ...this.config, keyword: target.value });
    }, 400);
  }
}

export const categories = [
  { name: "action" },
  { name: "adventure" },
  { name: "indie" },
  { name: "rpg" },
  { name: "strategy" },
  { name: "open world" },
  { name: "shooter" },
  { name: "puzzle" },
  { name: "first person" },
  { name: "narration" },
  { name: "simulator" },
  { name: "casual" },
  { name: "turn-based" },
  { name: "exploration" },
  { name: "horror" },
  { name: "platformer" },
  { name: "party" },
  { name: "survival" },
  { name: "trivia" },
  { name: "city builder" },
  { name: "steath" },
  { name: "fighting" },
  { name: "comedy" },
  { name: "action-adventure" },
];
