import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthFacade } from '@facade';
import {
  IRentMovie,
  IRental,
  IRentalQueryRequest,
  IRentalQueryResponse,
  RentMovie,
  Rental,
  RentalQueryResponse,
} from '@models';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  GetRentalRequest,
  IGetRentalRequest,
} from 'src/domain/models/rental/getRental/get.rental.request';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  private savedUserActiveRentals: IRental[] = [];
  private userActiveRentalsBehaviorSubject: BehaviorSubject<IRental[]> =
    new BehaviorSubject<IRental[]>([]);
  public userActiveRentals$: Observable<IRental[]> =
    this.userActiveRentalsBehaviorSubject.asObservable();

  constructor(private authFacade: AuthFacade, private http: HttpClient) {}

  public refreshUserActiveRentals() {
    this.getAllUserActiveRentals().subscribe((rentals) => {
      this.userActiveRentalsBehaviorSubject.next(rentals.results);
    });
  }

  public getUserRentals(
    request: IRentalQueryRequest
  ): Observable<IRentalQueryResponse> {
    return this.http
      .get<IRentalQueryRequest>(
        '/api/rent-store/rentals/?page=' +
          request.page +
          '&page_size=' +
          request.page_size
      )
      .pipe(
        map((response) => {
          return new RentalQueryResponse(response);
        })
      );
  }

  public getAllUserActiveRentals(): Observable<IRentalQueryResponse> {
    return this.http
      .get<IRentalQueryRequest>(
        '/api/rent-store/rentals/?only-active=true&page_size=100'
      )
      .pipe(
        map((response) => {
          const rentalResponse = new RentalQueryResponse(response);
          this.savedUserActiveRentals = rentalResponse.results;
          return rentalResponse;
        })
      );
  }

  public getSavedUserActiveRentals(): IRental[] {
    return this.savedUserActiveRentals;
  }

  public rentMovie(request: IRentMovie): Observable<IRentMovie> {
    return this.http.post<IRentMovie>('/api/rent-store/rentals/', request).pipe(
      map((response: IRentMovie) => {
        return new RentMovie(response?.movie);
      })
    );
  }

  public returnMovie(id: string): Observable<boolean> {
    return this.http.patch<any>('/api/rent-store/rentals/' + id, {}).pipe(
      map((response) => {
        return true;
      })
    );
  }

  public getRental(id: string): Observable<IRental> {
    const request = new GetRentalRequest(id);
    return this.http
      .get<IRental>('/api/rent-store/rentals/' + request.rental_uuid)
      .pipe(
        map((response: IRental) => {
          return new Rental(response);
        })
      );
  }
}
