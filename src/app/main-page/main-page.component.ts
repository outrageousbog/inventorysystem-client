import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private router: Router,
              private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Main - InventorySystem');
  }

  onProductsClick() {
    this.router.navigate(['/main/products'], );
  }

  onBrandsClick() {
    this.router.navigate(['/main/brands'], );
  }
}
