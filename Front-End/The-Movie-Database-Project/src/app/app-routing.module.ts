import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/accounts/login/login.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';

const routes: Routes = [
  {path: 'landing-page', component: LandingPageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'contact-us', component: ContactUsComponent},
  {path: '', redirectTo: 'landing-page', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
