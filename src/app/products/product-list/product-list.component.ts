import { Component, OnInit } from '@angular/core';
import {Product} from '../../shared/views/product';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PaginatorService} from '../../shared/pages/paginator.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../product-service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [PaginatorService]
})
export class ProductListComponent implements OnInit {
  productList: Product[] = [];
  productSearch: FormGroup;
  searchComplete: boolean = false;

  constructor(private router: Router,
              private productService: ProductService,
              private route: ActivatedRoute,
              public pageService: PaginatorService) { }

  ngOnInit() {
    this.productSearch = new FormGroup({
      'search': new FormControl(null),
      'onlyStock': new FormControl(false)
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
    this.productService.search(this.productSearch);
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
    this.router.navigate(['/main/products/'+index],);
  }
}
