import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ILoginResponse, LoginRequest } from '@models';
import { AuthFacade } from '@facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoadingLogin = false;
  loginSuccess = true;
  loginMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authFacade: AuthFacade,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    //TODO delete later
    this.loginForm.setValue({
      username: 'ivourliasuser',
      password: 'Z2nmj6XRoD4ks76ZnG7fdL',
    });
  }

  ngOnInit(): void {}

  login() {
    this.isLoadingLogin = true;
    this.authFacade
      .login(
        new LoginRequest()
          .setPasssword(this.loginForm.value.password)
          .setUsername(this.loginForm.value.username)
      )
      .subscribe({
        next: (response: ILoginResponse) => {
          if (response.success) {
            this.loginSuccess = true;
            this.router.navigate(['home']);
          } else {
            this.loginSuccess = false;
            this.loginMessage = response.message;
          }
          this.isLoadingLogin = false;
        },
        error: (error) => {
          this.loginSuccess = false;
          this.loginMessage = error.message;
          this.isLoadingLogin = false;
        },
      });
  }
}
