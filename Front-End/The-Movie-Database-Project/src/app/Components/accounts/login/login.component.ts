import { Component, OnInit } from '@angular/core';
import {AccountsServiceService} from '../../../Services/AccountsService/accounts-service.service';
import {UserModel} from '../../../Core/Models/UserModel';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalService} from '../../_modal';

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
    // this.userModel.email = 'jointheteam@aglet.co.za';
    // this.userModel.username = 'jointheteam';
    // this.userModel.password = '@TeamAglet';

    this.initiateForm();

    this.isLoggedIn = false;
  }

  initiateForm(): void {
    this.stageForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  login(): void {
    this.accountsService.Login(this.userModel).subscribe(res => {
      console.log(res);
      if (res) {
        this.isLoggedIn = true;
        localStorage.setItem('userToken', JSON.stringify(res.token));
        this.getProfile();
        window.location.reload(); /* I know it's illegal */
      }
    }, error => {
      console.log(error);
    });
  }

  getProfile(): void {
    const token = localStorage.getItem('userToken');
    this.accountsService.getUserProfile(token).subscribe(res => {
      console.log(res);
      localStorage.setItem('currentUser', res.data.name);
    }, error => {
      console.log(error);
    });
  }

  openRegister(): void {
    this.modalService.close('login');
    this.modalService.open('register');
  }

}
