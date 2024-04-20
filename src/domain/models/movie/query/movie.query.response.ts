import { IMovie, Movie } from '../movie';

export interface IMovieQueryResponse {
  count: number;
  next: string;
  previous: string;
  results: IMovie[];
}

export class MovieQueryResponse implements IMovieQueryResponse {
  count!: number;
  next!: string;
  previous!: string;
  results!: IMovie[];

  constructor(data?: any) {
    this.count = data?.count ?? 0;
    this.next = data?.next ?? '';
    this.previous = data?.previous ?? '';
    this.results = data?.results?.map((x: any) => new Movie(x)) ?? [];
  }
}
