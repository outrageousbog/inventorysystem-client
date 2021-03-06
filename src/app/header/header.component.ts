import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../shared/authentication/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
  }

  onHomeClick() {
    this.router.navigate(['/main']);
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
