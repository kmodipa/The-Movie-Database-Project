import {MovieModel} from './MovieModel';

export class RawMovieModel {
  page: number;
  results: MovieModel[];
  total_results: number;
  total_pages: number;
}

