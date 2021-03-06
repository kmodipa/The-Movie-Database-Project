import { Component, OnInit } from '@angular/core';
import { RawMovieModel } from 'src/app/Core/Models/RawMovieModel';
import { MoviesServiceService } from 'src/app/Services/MoviesService/movies-service.service';
import {MovieModel} from '../../Core/Models/MovieModel';
import {FavoriteMoviesResponseModel} from '../../Core/Models/FavoriteMoviesResponseModel';
import {SearchServiceService} from '../../Services/SearchService/search-service.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  movies: MovieModel[];
  rawMovies: RawMovieModel;
  favouriteMoviesIds: FavoriteMoviesResponseModel;
  isLiked: boolean;
  movieIds = [];
  searchValue: string;

  /* pagination */
  config: any;
  term: any;
  removePagination = true;

  subscription: Subscription;

  constructor(private moviesService: MoviesServiceService,
              private searchService: SearchServiceService) { }

  ngOnInit(): void {
    this.movies = new Array<MovieModel>();
    this.rawMovies = new RawMovieModel();
    this.rawMovies.results = new Array<MovieModel>();
    this.favouriteMoviesIds = new FavoriteMoviesResponseModel();
    this.favouriteMoviesIds.data = [];

    this.isLiked = false;
    this.fetchFavoriteMoviesIds();
    this.fetchPopularMovies();
    this.fetchSearchResults();
  }

  searchMovies(value: string): void {
    this.moviesService.SearchMovies(value).subscribe( res => {
      this.rawMovies = res;
      this.movies = this.rawMovies.results;

      this.config = {
        itemsPerPage: 9,
        currentPage: 1,
        totalItems: this.movies.length
      };

      if (this.movies.length >= 5) {
        this.removePagination = false;
      }
    });
  }

  fetchSearchResults(): void {
    this.subscription = this.searchService.getMessage().subscribe(x => {
      if (x && x.text !== '') {
        this.term = x.text;
        this.removePagination = true;
      } else {
        this.removePagination = false;
        this.term = undefined;
      }
    });
  }

  fetchPopularMovies(): void {
    this.moviesService.GetPopularMovies().subscribe(response => {
      console.log(response);
      this.rawMovies = response;
      this.movies = this.rawMovies.results;

      this.config = {
        itemsPerPage: 9,
        currentPage: 1,
        totalItems: this.movies.length
      };

      if (this.movies.length >= 5) {
        this.removePagination = false;
      }
      console.log(this.movies);
    });
  }

  fetchFavoriteMoviesIds(): void {
    this.moviesService
      .GetFavoriteMoviesFromOwnDB(+localStorage.getItem('currentUserId')).subscribe(res => {
      this.favouriteMoviesIds = res;

      for (let i = 0; i < this.favouriteMoviesIds.data.length; i++) {
        this.movieIds.push(this.favouriteMoviesIds.data[i].movie_id);
        // this.fetchMovieDetails(this.favouriteMoviesIds.data[i].movie_id);
      }
      console.log(this.favouriteMoviesIds);
    });
  }

  fetchMovieDetails(movieId: number): void {
    this.moviesService.GetMovieDetails(movieId).subscribe( res => {
      this.movies.push(res);
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
