import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { MoviesComponent } from './movies/movies.component';
import { LoginComponent } from './accounts/login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MovieCardComponent } from './landing-page/movie-card/movie-card.component';

/* custom components */
export const components = [
  LoginComponent,
  ContactUsComponent,
  NavbarComponent,
  MoviesComponent,
  LandingPageComponent,
  MovieCardComponent
];

@NgModule({
  declarations: [components, ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ], exports: [components]
})
export class ComponentsModule { 
  constructor() {
  }
}
