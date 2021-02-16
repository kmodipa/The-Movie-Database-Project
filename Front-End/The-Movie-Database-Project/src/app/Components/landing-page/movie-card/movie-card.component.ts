import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ModalService} from '../../_modal';
import {MovieModel} from '../../../Core/Models/MovieModel';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

@Input() movie: MovieModel;
@Input() movieIndex: number;

  constructor(private router: Router,
              public modalService: ModalService) { }

  ngOnInit(): void {
    // console.log(this.movie);
    console.log(this.movieIndex);
  }

  onOut(): void {
    this.modalService.close('movie-details' + this.movieIndex);
  }

  fetchMovieDetails(): void {

  }

  addToFavourites(): void {

  }
}
