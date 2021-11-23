export interface IGame {
  name: string;
  short_name: string;
  type: string;
  title: string;
  description: string;
  developer: string;
  publisher: string;
  release_date: Date;
  platform: string;
  price: number;
  keys: [object];
  images: [object];
  videos: [object];
  includes: [string];
  included_in: [string];
}
