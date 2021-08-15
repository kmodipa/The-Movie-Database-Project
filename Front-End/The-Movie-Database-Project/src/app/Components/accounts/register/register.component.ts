import { Component, OnInit } from '@angular/core';
import {AccountsServiceService} from '../../../Services/AccountsService/accounts-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalService} from '../../_modal';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserModel} from '../../../Core/Models/UserModel';
import {ToasterNotificationServiceService} from '../../../Services/ToasterNotificationService/toaster-notification-service.service';

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
              public formBuilder: FormBuilder,
              private notificationService: ToasterNotificationServiceService) { }

  ngOnInit(): void {
    this.initiateForm();
    this.userModel = new UserModel();
  }

  initiateForm(): void {
    this.registerForm = this.formBuilder.group({
      email: ['',
        [Validators.required,
          Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  register(): void {
    /* -Mark form as touched- */
    this.email.markAsTouched();
    this.password.markAsTouched();

    if (this.registerForm.valid) {
      this.userModel.username = this.userModel.email;
      this.accountsService.register(this.userModel).subscribe(res => {
        console.log(res);
        if (res.status === 200) {
          this.notificationService.Success('Login Successful');
          window.location.reload();
        } else {
          this.notificationService.Failure('Registration failed for some reason');
        }

      }, error => {
        this.notificationService.Failure(error.error.message);
        console.log(error);
      });
    }

  }

  openLogin(): void {
    this.modalService.close('register');
    this.modalService.open('login');
  }

  /* -registerForm Getters- */
  get email(): AbstractControl {
    return this.registerForm.get('email');
  }

  get password(): AbstractControl {
    return this.registerForm.get('password');
  }

}
