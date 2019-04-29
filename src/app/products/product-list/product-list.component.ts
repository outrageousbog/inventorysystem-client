import { Component, OnInit } from '@angular/core';
import {Product} from '../../shared/views/product';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PaginatorService} from '../../shared/pages/paginator.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from './product-service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [PaginatorService]
})
export class ProductListComponent implements OnInit {
  protected productList: Product[] = [null];
  protected productSearch: FormGroup;
  private searchComplete: boolean = false;

  constructor(private router: Router,
              private productService: ProductService,
              private route: ActivatedRoute,
              private pageService: PaginatorService) { }

  ngOnInit() {
    this.productSearch = new FormGroup({
      'search': new FormControl(null, [Validators.required])
    });

    this.productList = this.productService.getProductsArray();
    if (this.productList.length > 0) {
      this.searchComplete = true;
      this.initPages();
    } else {
      this.searchComplete = false;
    }

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
      this.pageService.initPages(0);
    }
    else {
      this.pageService.initPages(this.productList.length);
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
