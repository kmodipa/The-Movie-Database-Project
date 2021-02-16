import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieModel } from 'src/app/Core/Models/Movie.Model';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

@Input() movie: MovieModel;

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.movie);
  }
  
  fetchMovieDetails(): void {
    
  }

  addToFavourites(): void {
    
  }
}
