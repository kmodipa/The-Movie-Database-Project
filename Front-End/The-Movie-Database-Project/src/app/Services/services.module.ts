import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ServicesImports} from './index';
import {HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [],
  providers: ServicesImports
})
export class ServicesModule { }
