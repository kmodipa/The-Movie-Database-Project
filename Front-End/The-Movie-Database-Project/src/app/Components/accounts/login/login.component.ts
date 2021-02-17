import { Component, OnInit } from '@angular/core';
import {AccountsServiceService} from '../../../Services/AccountsService/accounts-service.service';
import {UserModel} from '../../../Core/Models/UserModel';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalService} from '../../_modal';
import {response} from 'express';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoggedIn: boolean;
  userModel: UserModel;
  stageForm: FormGroup;

  constructor(private accountsService: AccountsServiceService,
              private router: Router,
              public activatedRoute: ActivatedRoute,
              public modalService: ModalService,
              public formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.userModel = new UserModel();
    this.userModel.email = 'jointheteam@aglet.co.za';
    this.userModel.username = 'jointheteam';
    this.userModel.password = '@TeamAglet';

    this.initiateForm();

    this.isLoggedIn = false;
    // this.login();
  }

  initiateForm(): void {
    this.stageForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  login(): void {
    this.accountsService.Login(this.userModel).subscribe(response => {
      console.log(response);
      if (response) {
        this.isLoggedIn = true;
      }
    }, error => {
      console.log(error);
    });
  }

  openRegister(): void {
    this.modalService.close('login');
    this.modalService.open('register');
  }

}
