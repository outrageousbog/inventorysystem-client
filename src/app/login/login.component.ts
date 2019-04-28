import {Component, ErrorHandler, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Data, Router} from '@angular/router';
import {WebService} from '../shared/web/web.service';
import {UserService} from '../shared/views/user.service';
import {pipe} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from '../shared/authentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private router: Router, private web: WebService, private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl("s175108", [Validators.required]),
      password: new FormControl("test", [Validators.required]),
    })
  }

  onSubmit() {
    let user = new UserService();
    user.username = this.loginForm.controls.username.value;
    user.password = this.loginForm.controls.password.value;
    this.web.validateUser(user)
      .subscribe(
        (data: Data) => {
            localStorage.setItem(`token`, data.token);
          console.log(data);
          this.router.navigate(['/main']);
          this.authService.login();
        },
        (error: ErrorHandler) => {
          console.log('An error occured: ' + pipe(error.handleError))
        }
      );

    // this.router.navigate(['/frontpage']);
    // console.log(new UserService(this.loginForm));
  }
}
