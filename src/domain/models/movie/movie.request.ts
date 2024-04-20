export interface IMovieRequestModel {
  title: string;
  pub_date: number;
  duration: number;
  rating: number;
  categories: string[];
}

export class MovieRequestModel implements IMovieRequestModel {
  title!: string;
  pub_date!: number;
  duration!: number;
  rating!: number;
  categories!: string[];

  constructor(data?: any) {
    this.title = data?.title ?? '';
    this.pub_date = data?.pub_date ?? '';
    this.duration = data?.duration ?? undefined;
    this.rating = data?.rating ?? undefined;
    this.categories = data?.categories ?? [];
  }
}
