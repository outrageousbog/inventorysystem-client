import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  onHomeClick() {
    this.router.navigate(['/main']);
  }

  onProductsClick() {
    this.router.navigate(['products'], {relativeTo: this.route})
  }

  onBrandsClick() {
    this.router.navigate(['brands'], {relativeTo: this.route})
  }
}
