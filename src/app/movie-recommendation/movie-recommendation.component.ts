import { Component, OnInit, ViewChild } from '@angular/core';
import { IRental, Movie, MovieQueryRequest } from '@models';
import { MovieService } from 'src/domain/services/movie/movie.service';
import { RentalService } from 'src/domain/services/rental/rental.service';

@Component({
  selector: 'app-movie-recommendation',
  templateUrl: './movie-recommendation.component.html',
  styleUrls: ['./movie-recommendation.component.scss'],
})
export class MovieRecommendationComponent implements OnInit {
  @ViewChild('movieRecommentationContainer')
  movieRecommentationContainer!: HTMLElement;
  movies!: Movie[];
  userActiveRentals!: IRental[];
  allMovieCategories!: string[];
  public page = 0;
  private pageSize = 12;
  private currentRequest = new MovieQueryRequest();

  constructor(
    private movieService: MovieService,
    private rentalService: RentalService
  ) {}

  ngOnInit(): void {
    this.movieQuery(this.getRequest());
    this.categoriesQuery();

    //subscribe to get updates to user active rentals
    this.rentalService.userActiveRentals$.subscribe((rentals) => {
      this.userActiveRentals = rentals;
    });

    //fetch active rentals of user.
    this.rentalService.refreshUserActiveRentals();
  }

  categoryClicked(category: string) {
    if (this.currentRequest.categories.includes(category)) {
      this.currentRequest.categories.splice(
        this.currentRequest.categories.indexOf(category)
      );
    } else {
      this.currentRequest.categories.push(category);
    }

    this.currentRequest.page = 1;
    this.currentRequest.pageSize = this.pageSize;
    this.movieQuery(this.currentRequest);
  }

  getPreviousPage() {
    this.movieQuery(this.getRequest(true));
  }

  getNextPage() {
    this.movieQuery(this.getRequest());
  }

  getRequest(getPrevious: boolean = false) {
    this.page = !getPrevious ? this.page + 1 : this.page - 1;
    this.currentRequest.page = this.page;
    this.currentRequest.pageSize = this.pageSize;
    return this.currentRequest;
  }

  movieQuery(request: MovieQueryRequest) {
    this.movieService.movieQuery(request).subscribe((response) => {
      this.movies = response.results;
    });
  }

  categoriesQuery() {
    this.movieService.getAllMovieCategories().subscribe((response) => {
      this.allMovieCategories = response;
    });
  }
}
