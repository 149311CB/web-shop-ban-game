import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ImageService {
  constructor() {}

  getLandscape(images: any[]) {
    return images.filter(
      (image) => image.type === "landscape" && image.url !== ""
    );
  }

  getPortrait(images: any[]) {
    return images.filter(
      (image) => image.type === "portrait" && image.url !== ""
    );
  }
}
