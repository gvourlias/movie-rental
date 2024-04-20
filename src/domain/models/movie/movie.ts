export interface IMovie {
  uuid: string;
  title: string;
  pub_date: number;
  duration: number;
  rating: number;
  description: string;
  poster_url: string;
}

export class Movie implements IMovie {
  uuid: string;
  title: string;
  pub_date: number;
  duration: number;
  rating: number;
  description: string;
  poster_url: string;

  constructor(data?: any) {
    this.uuid = data?.uuid ?? '';
    this.title = data?.title ?? '';
    this.pub_date = data?.pub_date ?? undefined;
    this.duration = data?.duration ?? undefined;
    this.rating = data?.rating ?? undefined;
    this.description = data?.description ?? '';
    this.poster_url = data?.poster_url ?? '';
  }
}
