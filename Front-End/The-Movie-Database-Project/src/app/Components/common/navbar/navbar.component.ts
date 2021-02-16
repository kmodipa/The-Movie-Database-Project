import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLogIn: boolean;
  searchValue: any;

  constructor(private router: Router,
              public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.isLogIn = true;
  }

  logIn(): void {

  }

  logOut(): void {

  }

  search(phrase: string): void {

  }

}
