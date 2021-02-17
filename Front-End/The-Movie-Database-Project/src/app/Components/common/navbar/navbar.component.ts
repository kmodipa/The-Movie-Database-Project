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

  isLogIn: boolean;
  searchValue: any;
  stageForm: FormGroup;

  constructor(private router: Router,
              public activatedRoute: ActivatedRoute,
              public modalService: ModalService,
              public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.isLogIn = true;
    this.initiateForm();
  }

  logIn(): void {

  }

  onOut(): void {
    this.modalService.close('login');
  }

  goToContact(): void {
    this.router.navigate(['contact-us']);
  }

  goToFavorites(): void {
    this.router.navigate(['favorites']);
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
