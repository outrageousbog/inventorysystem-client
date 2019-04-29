import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onProductsClick() {
    this.router.navigate(['/main/products'], );
  }

  onBrandsClick() {
    this.router.navigate(['/main/brands'], );
  }
}
