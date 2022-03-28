import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StringService {
  constructor() {}

  camelCase(text: string) {
    return text[0].toUpperCase() + text.slice(1);
  }

  formatDate(date: string) {
    return new Date(date).toLocaleDateString();
  }
}
