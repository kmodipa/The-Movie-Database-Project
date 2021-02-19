import { Component, OnInit } from '@angular/core';
import {MovieModel} from '../../Core/Models/MovieModel';
import {RawMovieModel} from '../../Core/Models/RawMovieModel';
import {MoviesServiceService} from '../../Services/MoviesService/movies-service.service';
import {FavoriteMoviesResponseModel} from '../../Core/Models/FavoriteMoviesResponseModel';

@Component({
  selector: 'app-movie-favorites',
  templateUrl: './movie-favorites.component.html',
  styleUrls: ['./movie-favorites.component.scss']
})
export class MovieFavoritesComponent implements OnInit {

  movies: MovieModel[];
  rawMovies: RawMovieModel;
  favouriteMoviesIds: FavoriteMoviesResponseModel;
  movieIds = [];

  /* pagination */
  config: any;
  term: any;
  removePagination = true;

  constructor(private moviesService: MoviesServiceService) { }

  ngOnInit(): void {
    this.movies = new Array<MovieModel>();
    this.rawMovies = new RawMovieModel();
    this.rawMovies.results = new Array<MovieModel>();
    this.favouriteMoviesIds = new FavoriteMoviesResponseModel();
    this.favouriteMoviesIds.data = [];

    this.fetchFavoriteMoviesIds();
  }

  fetchMovieDetails(movieId: number): void {
    this.moviesService.GetMovieDetails(movieId).subscribe( res => {
      this.movies.push(res);

      this.config = {
        itemsPerPage: 9,
        currentPage: 1,
        totalItems: this.movies.length
      };

      if (this.movies.length >= 5) {
        this.removePagination = false;
      }
    });

    console.log(this.movies);
  }

  fetchFavoriteMoviesIds(): void {
    this.moviesService
      .GetFavoriteMoviesFromOwnDB(+localStorage.getItem('currentUserId')).subscribe(res => {
      this.favouriteMoviesIds = res;

      for (let i = 0; i < this.favouriteMoviesIds.data.length; i++) {
        this.movieIds.push(this.favouriteMoviesIds.data[i].movie_id);
        this.fetchMovieDetails(this.favouriteMoviesIds.data[i].movie_id);
      }
      console.log(this.favouriteMoviesIds);
    });
  }

  checkIfMovieIsLiked(movieId: number): boolean {
    if (this.movieIds.includes(movieId)) {
      return true;
    } else {
      return false;
    }
  }

  pageChanged(event): void {
    this.config.currentPage = event;
  }
}
