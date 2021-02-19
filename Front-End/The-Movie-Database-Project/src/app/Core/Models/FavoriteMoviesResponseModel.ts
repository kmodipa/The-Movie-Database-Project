export class FavoriteMoviesResponseModel {
  status: number;
  data: {
    id: number,
    user_id: number,
    movie_id: number
  }[];
  message: string;
}
