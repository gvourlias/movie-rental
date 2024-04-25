import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { IRental, Movie, RentMovie, Rental } from '@models';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RentalService } from 'src/domain/services/rental/rental.service';
import { UserBalanceService } from 'src/domain/services/user/user.balance.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.dialog.html',
  styleUrls: ['./movie-details.dialog.scss'],
})
export class MovieDetailsDialog implements OnInit {
  @Input() movie!: Movie;
  public movieRental!: IRental | undefined;
  public isRented = false;
  public isLoadingAction = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Movie,
    private rentalService: RentalService,
    private userBalanceService: UserBalanceService
  ) {
    this.movie = data;
  }

  ngOnInit(): void {
    //get all the saved user active rentals
    this.movieRental = this.rentalService
      .getSavedUserActiveRentals()
      .find((rental: IRental) => rental.movie === this.movie.title);
    this.isRented = !!this.movieRental;

    //and subscribe to the user active rentals whenever they are updated
    this.rentalService.userActiveRentals$.subscribe((rentals) => {
      const movieThatWasJustRented = rentals.find(
        (rental) => rental.movie === this.movie.title
      );
      this.movieRental = movieThatWasJustRented;
      this.isRented = !!this.movieRental ?? false;
      this.isLoadingAction = false;
    });
  }

  rentMovie() {
    this.isLoadingAction = true;

    const request = new RentMovie(this.movie.uuid);
    this.rentalService.rentMovie(request).subscribe((response) => {
      console.log(response);
      this.rentalService.refreshUserActiveRentals();
    });
  }

  returnMovie() {
    if (!this.movieRental) {
      return;
    }
    this.rentalService
      .returnMovie(this.movieRental?.uuid)
      .subscribe((response) => {
        console.log(response);
        this.rentalService.refreshUserActiveRentals();
        this.userBalanceService.updateBalance(-(this.movieRental?.charge ?? 0));
      });
  }
}
