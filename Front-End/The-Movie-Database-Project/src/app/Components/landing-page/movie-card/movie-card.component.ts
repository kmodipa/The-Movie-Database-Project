import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ModalService} from '../../_modal';
import {MovieModel} from '../../../Core/Models/MovieModel';
import {MoviesServiceService} from '../../../Services/MoviesService/movies-service.service';
import {FavoriteMovieRequestModel} from '../../../Core/Models/FavoriteMovieRequestModel';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

@Input() movie: MovieModel;
@Input() movieIndex: number;

  constructor(private router: Router,
              public modalService: ModalService,
              private movieService: MoviesServiceService) { }

  ngOnInit(): void {
    // console.log(this.movie);
    console.log(this.movieIndex);
  }

  onOut(): void {
    this.modalService.close('movie-details' + this.movieIndex);
  }

  addToFavourites(movieId: number): void {

    if (localStorage.getItem('currentUser')) {
      const favouriteMovieModel = new FavoriteMovieRequestModel();
      favouriteMovieModel.movieid = movieId;
      favouriteMovieModel.userid = +localStorage.getItem('currentUserId');
      console.log(favouriteMovieModel);

      this.movieService.UpsertFavoriteMovie(favouriteMovieModel).subscribe( res => {
        console.log(res);
        console.log(res.status);
      }, error => {

      });
    } else {
      this.modalService.open('login');
    }

  }
}
