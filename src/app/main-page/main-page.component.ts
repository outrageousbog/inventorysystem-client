import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onProductsClick() {
    this.router.navigate(['products'], {relativeTo: this.route});
  }

  onBrandsClick() {
    this.router.navigate(['brands'], {relativeTo: this.route});
  }
}
