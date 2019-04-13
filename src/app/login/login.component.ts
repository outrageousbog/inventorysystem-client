import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Data, Router} from '@angular/router';
import {WebService} from '../shared/web.service';
import {UserService} from '../shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private router: Router, private web: WebService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl("s175108", [Validators.required]),
      password: new FormControl("test", [Validators.required]),
    })
  }

  onSubmit() {
    // let user = new UserService();
    // user.username = this.loginForm.controls.username.value;
    // user.password = this.loginForm.controls.password.value;
    // this.web.validateUser(user)
    //   .subscribe(
    //     () => {
    //       this.router.navigate(['/frontpage']);
    //     },
    //     (error: Data) => {
    //       window.alert(error);
    //     }
    //   );

    this.router.navigate(['/frontpage']);
    // console.log(new UserService(this.loginForm));
  }
}
