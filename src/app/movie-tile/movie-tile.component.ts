import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Movie } from '@models';
import { MovieDetailsDialog } from '../../domain/dialogs/movie-details-dialog/movie-details.dialog';

@Component({
  selector: 'app-movie-tile',
  templateUrl: './movie-tile.component.html',
  styleUrls: ['./movie-tile.component.scss'],
})
export class MovieTileComponent implements OnInit {
  @Input() movie!: Movie;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openMovieDetails() {
    console.log(this.movie);
    this.dialog.open(MovieDetailsDialog, {
      panelClass: ['movie-details-dialog'],
      data: this.movie,
    });
  }
}
