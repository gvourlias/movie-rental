export interface IRentMovie {
  movie: string;
}

export class RentMovie implements IRentMovie {
  movie!: string;

  constructor(movieId?: string) {
    this.movie = movieId ?? '';
  }
}
