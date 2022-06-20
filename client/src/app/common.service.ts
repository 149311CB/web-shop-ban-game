import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  constructor() {}

  formatDate(date: string) {
    const newDate = new Date(date);
    return `${newDate.getFullYear()}/${newDate.getMonth()}/${newDate.getDate()}`;
  }
}
