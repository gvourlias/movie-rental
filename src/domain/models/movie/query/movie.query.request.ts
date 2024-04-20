export interface IMovieQueryRequest {
  page: number;
  pageSize: number;
  categories: string[];
  orderBy: string[];
}

export class MovieQueryRequest implements IMovieQueryRequest {
  page: number;
  pageSize: number;
  categories: string[];
  orderBy: string[];

  constructor(data?: any) {
    this.page = data?.page ?? 1;
    this.pageSize = data?.pageSize ?? 20;
    this.categories = data?.categories ?? [];
    this.orderBy = data?.orderBy ?? [];
  }
}
