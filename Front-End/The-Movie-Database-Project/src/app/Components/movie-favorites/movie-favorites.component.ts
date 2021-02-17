import { Component, OnInit } from '@angular/core';
import {MovieModel} from '../../Core/Models/MovieModel';
import {RawMovieModel} from '../../Core/Models/RawMovieModel';
import {MoviesServiceService} from '../../Services/MoviesService/movies-service.service';

@Component({
  selector: 'app-movie-favorites',
  templateUrl: './movie-favorites.component.html',
  styleUrls: ['./movie-favorites.component.scss']
})
export class MovieFavoritesComponent implements OnInit {

  movies: MovieModel[];
  rawMovies: RawMovieModel;

  constructor(private moviesService: MoviesServiceService) { }

  ngOnInit(): void {
    this.movies = new Array<MovieModel>();
    this.rawMovies = new RawMovieModel();
    this.rawMovies.results = new Array<MovieModel>();
  }

}
