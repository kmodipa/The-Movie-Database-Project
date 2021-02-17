import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import {MovieFavoritesComponent} from './Components/movie-favorites/movie-favorites.component';

const routes: Routes = [
  {path: 'landing-page', component: LandingPageComponent},
  {path: 'favorites', component: MovieFavoritesComponent},
  {path: 'contact-us', component: ContactUsComponent},
  {path: '', redirectTo: 'landing-page', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
