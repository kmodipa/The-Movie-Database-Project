import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import {ModalService} from '../../_modal';
import {MovieModel} from '../../../Core/Models/MovieModel';
import {MoviesServiceService} from '../../../Services/MoviesService/movies-service.service';
import {FavoriteMovieRequestModel} from '../../../Core/Models/FavoriteMovieRequestModel';
import {FavoriteMoviesResponseModel} from '../../../Core/Models/FavoriteMoviesResponseModel';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

@Input() movie: MovieModel;
@Input() movieIsLiked: boolean;
@Input() movieIndex: number;
@Output() unlikedMovieIndex: EventEmitter<number> = new EventEmitter<number>();

  favouriteMoviesIds: FavoriteMoviesResponseModel;

  constructor(private router: Router,
              public modalService: ModalService,
              private movieService: MoviesServiceService) { }

  ngOnInit(): void {
    this.favouriteMoviesIds = new FavoriteMoviesResponseModel();
    this.favouriteMoviesIds.data = [];
  }

  addToFavourites(movieId: number): void {

    if (localStorage.getItem('currentUser')) {
      const favouriteMovieModel = new FavoriteMovieRequestModel();
      favouriteMovieModel.movieid = movieId;
      favouriteMovieModel.userid = +localStorage.getItem('currentUserId');
      console.log(favouriteMovieModel);

      this.movieService.UpsertFavoriteMovie(favouriteMovieModel).subscribe( res => {
        console.log(res);
        if (res.status === 200) {
          this.movieIsLiked = true;
        } else {
          this.movieIsLiked = false;
        }
        // console.log(res.status);
        // window.location.reload();
      }, error => {
        console.log(error);
      });
    } else {
      this.modalService.open('login');
    }

  }

  removeFromFavourites(movie: MovieModel): void {
    const movieRequestModel = new FavoriteMovieRequestModel();
    movieRequestModel.userid = +localStorage.getItem('currentUserId');
    movieRequestModel.movieid = movie.id;
    this.movieService.DeleteFavoriteMovie(movieRequestModel).subscribe( res => {
      if (res.status === 200) {
        this.movieIsLiked = false;
        this.unlikedMovieIndex.emit(this.movieIndex);
      } else {
        this.movieIsLiked = true;
      }
    });
  }

  onOut(): void {
    this.modalService.close('movie-details' + this.movieIndex);
  }
}
