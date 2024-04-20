import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '@models';

@Component({
  selector: 'app-movie-tile',
  templateUrl: './movie-tile.component.html',
  styleUrls: ['./movie-tile.component.scss'],
})
export class MovieTileComponent implements OnInit {
  @Input() movie!: Movie;

  constructor() {}

  ngOnInit(): void {}
}
