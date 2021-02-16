import { Component, OnInit } from '@angular/core';
import { MovieModel } from 'src/app/Core/Models/Movie.Model';
import { MoviesServiceService } from 'src/app/Services/MoviesService/movies-service.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  movies: MovieModel[];

  constructor(private moviesService: MoviesServiceService) { }

  ngOnInit(): void {
    this.movies = new Array<MovieModel>();

    this.fetchPopularMovies();
  }

  fetchPopularMovies(): void {
    this.moviesService.GetPopularMovies().subscribe(response => {
      console.log(response);
      this.movies = response;
      console.log(this.movies);
    });
  }

}
