import { Component, OnInit } from '@angular/core';
import { Movie, MovieQueryRequest } from '@models';
import { MovieService } from 'src/domain/services/movie/movie.service';

@Component({
  selector: 'app-movie-recommendation',
  templateUrl: './movie-recommendation.component.html',
  styleUrls: ['./movie-recommendation.component.scss'],
})
export class MovieRecommendationComponent implements OnInit {
  movies!: Movie[];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    let request = new MovieQueryRequest();
    request.pageSize = 50;

    this.movieService.movieQuery(request).subscribe((response) => {
      this.movies = response.results;
      console.log(this.movies);
    });
  }
}
