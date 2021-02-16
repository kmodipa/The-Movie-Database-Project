import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RawMovieModel } from 'src/app/Core/Models/RawMovieModel';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesServiceService {

  moviesEndpoint = `${environment.theMovieDbUrl}/`;
  moviesSearchEndpoint = `${environment.theMovieDbSearchUrl}/`;
  api_key = environment.theMovieDbApiKey;
  language = environment.language;

  constructor(private httpClient: HttpClient) { }

  /* Observable<RawMovieModel[]> failed :(*/
  // GetPopularMovies(): Observable<any> {
  //   return this.httpClient.get(`${this.moviesEndpoint}popular?api_key=${this.api_key}&language=${this.language}`)
  //   .pipe(map(data => {
  //     console.log(data);
  //     return data;
  //   }),
  //   catchError(error => {
  //     return Observable.throw('Something went wrong ;)');
  //   }));
  // }

  GetPopularMovies(): Observable<RawMovieModel> {
    return this.httpClient.get<RawMovieModel>(`${this.moviesEndpoint}popular?api_key=${this.api_key}&language=${this.language}`);
  }

  SearchMovies(query: string): Observable<string> {
    return this.httpClient.get<string>(`${this.moviesSearchEndpoint}?api_key=${this.api_key}&language=${this.language}&query=${query}`);
  }

  GetMovieDetails(id: number): Observable<RawMovieModel> {
    return this.httpClient.get<RawMovieModel>(`${this.moviesEndpoint}${id}?api_key=${this.api_key}&language=${this.language}`);
  }
}
