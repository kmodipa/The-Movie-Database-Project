import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ModalService} from '../../_modal';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean;
  searchValue: any;
  stageForm: FormGroup;
  user: string;

  constructor(private router: Router,
              public activatedRoute: ActivatedRoute,
              public modalService: ModalService,
              public formBuilder: FormBuilder) { }

  ngOnInit(): void {

    if (localStorage.getItem('currentUser')) {
      this.isLoggedIn = true;
      this.user = localStorage.getItem('currentUser');
    } else {
      this.isLoggedIn = false;
    }

    this.initiateForm();
  }

  logIn(): void {

  }

  logOut(): void {
    console.log('logout');
    this.isLoggedIn = false;
    localStorage.removeItem('currentUser');
  }

  goToContact(): void {
    this.router.navigate(['contact-us']);
  }

  goToFavorites(): void {
    this.router.navigate(['favorites']);
    console.log(localStorage.getItem('currentUser'));
  }

  initiateForm(): void {
    this.stageForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  search(phrase: string): void {

  }

}
