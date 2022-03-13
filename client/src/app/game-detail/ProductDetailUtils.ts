export class GameDetail {
  getLandscape(images: any[]) {
    return images.filter(
      (image) => image.type === "landscape" && image.url !== ""
    );
  }

  camelCase(text: string) {
    return text[0].toUpperCase() + text.slice(1);
  }

  formatDate(date: string) {
    return new Date(date).toLocaleDateString();
  }
}
