import { Component, OnInit } from '@angular/core';
import {AccountsServiceService} from '../../../Services/AccountsService/accounts-service.service';
import {UserModel} from '../../../Core/Models/UserModel';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalService} from '../../_modal';
import {ToasterNotificationServiceService} from '../../../Services/ToasterNotificationService/toaster-notification-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoggedIn: boolean;
  userModel: UserModel;
  loginForm: FormGroup;

  constructor(private accountsService: AccountsServiceService,
              private router: Router,
              public activatedRoute: ActivatedRoute,
              public modalService: ModalService,
              public formBuilder: FormBuilder,
              private notificationService: ToasterNotificationServiceService) { }

  ngOnInit(): void {

    this.userModel = new UserModel();
    // this.userModel.email = 'jointheteam@aglet.co.za';
    // this.userModel.username = 'jointheteam';
    // this.userModel.password = '@TeamAglet';

    this.initiateForm();

    this.isLoggedIn = false;
  }

  initiateForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['',
        [Validators.required,
          Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login(): void {
    /* -Mark form as touched- */
    this.email.markAsTouched();
    this.password.markAsTouched();

    if (this.loginForm.valid) {
      this.accountsService.Login(this.userModel).subscribe(res => {
        console.log(res);
        if (res.status === 200) {
          this.isLoggedIn = true;
          localStorage.setItem('userToken', JSON.stringify(res.token));
          // localStorage.setItem('currentUserId', res.);
          this.getProfile();
          this.notificationService.Success('Login Successful');
        } else {
          this.notificationService.Failure('There was a problem logging in. Check your email and password or create an account.');
        }
      }, error => {
        console.log(error.error.message);
        this.notificationService.Failure(error.error.message);
      });
    }
  }

  getProfile(): void {
    const token = localStorage.getItem('userToken');
    this.accountsService.getUserProfile(token).subscribe(res => {
      console.log(res);
      localStorage.setItem('currentUser', res.data.name);
      localStorage.setItem('currentUserId', res.data.id.toString());
      // window.location.reload(); /* I know it's illegal */
      this.router.navigate(['favorites']);
    }, error => {
      console.log(error);
    });
  }

  openRegister(): void {
    this.modalService.close('login');
    this.modalService.open('register');
  }

  /* -LoginForm Getters- */
  get email(): AbstractControl {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }
}
