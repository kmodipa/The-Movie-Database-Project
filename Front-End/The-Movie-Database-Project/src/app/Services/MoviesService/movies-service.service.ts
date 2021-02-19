import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RawMovieModel } from 'src/app/Core/Models/RawMovieModel';
import {environment} from '../../../environments/environment';
import {FavoriteMoviesResponseModel} from '../../Core/Models/FavoriteMoviesResponseModel';
import {FavoriteMovieRequestModel} from '../../Core/Models/FavoriteMovieRequestModel';
import {MovieModel} from '../../Core/Models/MovieModel';

@Injectable({
  providedIn: 'root'
})
export class MoviesServiceService {

  moviesEndpoint = `${environment.theMovieDbUrl}/`;
  moviesSearchEndpoint = `${environment.theMovieDbSearchUrl}/`;
  backEndApi = `${environment.backEndApi}/movie`;
  apiKey = environment.theMovieDbApiKey;
  language = environment.language;

  constructor(private httpClient: HttpClient) { }

  GetPopularMovies(): Observable<RawMovieModel> {
    return this.httpClient.get<RawMovieModel>(`${this.moviesEndpoint}popular?api_key=${this.apiKey}&language=${this.language}`);
  }

  SearchMovies(query: string): Observable<string> {
    return this.httpClient.get<string>(`${this.moviesSearchEndpoint}?api_key=${this.apiKey}&language=${this.language}&query=${query}`);
  }

  GetMovieDetails(id: number): Observable<MovieModel> {
    return this.httpClient.get<MovieModel>(`${this.moviesEndpoint}${id}?api_key=${this.apiKey}&language=${this.language}`);
  }

  GetFavoriteMoviesFromOwnDB(userId: number): Observable<FavoriteMoviesResponseModel> {
    return this.httpClient.get<FavoriteMoviesResponseModel>(`${this.backEndApi}/getall?userid=${userId}`);
  }

  UpsertFavoriteMovie(favoriteMovie: FavoriteMovieRequestModel): Observable<any> {
    return this.httpClient.post<any>(`${this.backEndApi}/upsert`, favoriteMovie);
  }

  DeleteFavoriteMovie(favoriteMovie: FavoriteMovieRequestModel): Observable<any> {
    return this.httpClient.post<any>(`${this.backEndApi}/delete`, favoriteMovie);
  }
}
