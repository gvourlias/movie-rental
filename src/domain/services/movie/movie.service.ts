import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthFacade } from '@facade';
import {
  IMovieQueryRequest,
  IMovieQueryResponse,
  MovieQueryResponse,
  IMovieRequestModel,
  MovieRequestModel,
  IMovie,
  Movie,
} from '@models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private authFacade: AuthFacade, private http: HttpClient) {}

  public movieQuery(
    request: IMovieQueryRequest
  ): Observable<IMovieQueryResponse> {
    const categories = request.categories;

    let categoryStringParams = '';
    if (categories.length > 0) {
      categoryStringParams = '?category[]=' + categories.join('&category[]=');
    }

    const orderBy = request.orderBy;
    let orderByStringParams = '';
    if (categories.length > 0) {
      orderByStringParams = '?orderBy[]=' + orderBy.join('&orderBy[]=');
    }

    return this.http
      .get<IMovieQueryRequest>(
        '/api/rent-store/movies/?page=' +
          request.page +
          '&page_size=' +
          request.pageSize +
          (categoryStringParams ? categoryStringParams : '') +
          (orderByStringParams ? orderByStringParams : '')
      )
      .pipe(
        map((response) => {
          return new MovieQueryResponse(response);
        })
      );
  }

  public getMovieById(id: string): Observable<IMovie> {
    return this.http.get<string>('/api/rent-store/movies/' + id).pipe(
      map((response) => {
        return new Movie(response);
      })
    );
  }

  public createMovie(
    request: IMovieRequestModel
  ): Observable<IMovieRequestModel> {
    return this.http
      .post<IMovieRequestModel>('/api/rent-store/movies/', request)
      .pipe(
        map((response: IMovieRequestModel) => {
          return new MovieRequestModel(response);
        })
      );
  }
}
