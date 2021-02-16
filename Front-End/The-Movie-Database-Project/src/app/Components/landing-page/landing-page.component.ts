import { Component, OnInit } from '@angular/core';
import { RawMovieModel } from 'src/app/Core/Models/RawMovieModel';
import { MoviesServiceService } from 'src/app/Services/MoviesService/movies-service.service';
import {MovieModel} from '../../Core/Models/MovieModel';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  movies: MovieModel[];
  rawMovies: RawMovieModel;

  constructor(private moviesService: MoviesServiceService) { }

  ngOnInit(): void {
    this.movies = new Array<MovieModel>();
    this.rawMovies = new RawMovieModel();
    this.rawMovies.results = new Array<MovieModel>();

    this.fetchPopularMovies();
  }

  fetchPopularMovies(): void {
    this.moviesService.GetPopularMovies().subscribe(response => {
      console.log(response);
      this.rawMovies = response;
      this.movies = this.rawMovies.results;
      console.log(this.movies);
    });
  }

}
