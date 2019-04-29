import { Component, OnInit } from '@angular/core';
import {Product} from '../../shared/views/product';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PaginatorService} from '../../shared/pages/paginator.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from './product-service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  protected productList: Product[] = [null];
  protected productSearch: FormGroup;
  pageService: PaginatorService = new PaginatorService();
  private searchComplete: boolean = false;
  protected toShow: number = 10;

  optionsToShow = [
    {name : "5", value: 5},
    {name : "10", value: 10},
    {name : "25", value: 25},
    {name : "50", value: 50},
  ];

  constructor(private router: Router,
              private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.productSearch = new FormGroup({
      'search': new FormControl(null, [Validators.required])
    });

    this.productList = this.productService.getProductsArray();

    this.productService.productsSearchObs
      .subscribe(
        (data: Product[]) => {
          this.productList = data;
          this.searchComplete = true;
          this.initPages();
        }
      )
  }

  onSubmit() {
    this.searchForProducts();
  }

  private searchForProducts() {
    this.productService.search(this.productSearch.controls.search.value);
  }

  updatePages(newPage: number) {
    this.pageService.setCurrentPage(newPage);
  }

  private initPages() {
    if (this.productList== null ) {
      this.pageService.initPages(0, this.toShow);
    }
    else {
      this.pageService.initPages(this.productList.length, this.toShow);
    }
  }

  onProductClick(index: number) {
    console.log(index);
    this.router.navigate([index], {relativeTo: this.route});
  }

  onCreate() {
    this.router.navigate(['/products/create']);
  }
}
