// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: '',
  secret: 'secret',
  backEndApi: 'http://localhost:3000/api',
  theMovieDbUrl: 'https://api.themoviedb.org/3/movie',
  theMovieDbPopularMovies: 'https://api.themoviedb.org/3/discover/movie',
  theMovieDbSearchUrl: 'https://api.themoviedb.org/3/search/movie',
  theMovieDbApiKey: 'd6f744a7597256818a0774964bea7379',
  language: 'en-US'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
