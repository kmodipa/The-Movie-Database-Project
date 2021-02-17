import { Component, OnInit } from '@angular/core';
import {AccountsServiceService} from '../../../Services/AccountsService/accounts-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalService} from '../../_modal';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserModel} from '../../../Core/Models/UserModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isLoggedIn: boolean;
  userModel: UserModel;
  registerForm: FormGroup;

  constructor(private accountsService: AccountsServiceService,
              private router: Router,
              public activatedRoute: ActivatedRoute,
              public modalService: ModalService,
              public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initiateForm();
  }

  initiateForm(): void {
    this.registerForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  register(): void {

  }

  openLogin(): void {
    this.modalService.close('register');
    this.modalService.open('login');
  }

}
