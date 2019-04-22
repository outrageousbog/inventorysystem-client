import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Product} from '../shared/views/product';
import {WebService} from '../shared/web/web.service';
import {ProductSearchBuilder} from '../shared/search/product-search.builder';
import {Brand} from '../shared/views/brand';
import {Data, Router} from '@angular/router';
import {PaginatorService} from '../shared/pages/paginator.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  protected productList: Product[] = [null];
  protected productSearch: FormGroup;
  protected productSearchBuilder;
  pageService: PaginatorService;
  private searchComplete: boolean = false;
  protected toShow: number = 10;

  optionsToShow = [
    {name : "5", value: 5},
    {name : "10", value: 10},
    {name : "25", value: 25},
    {name : "50", value: 50},
  ];

  constructor(private webService: WebService, private router: Router) { }

  ngOnInit() {
    this.pageService = new PaginatorService();
    this.productSearch = new FormGroup({
      'search': new FormControl(null, [Validators.required])
    });
    this.productSearchBuilder = new ProductSearchBuilder();
  }

  onSubmit() {
    this.searchForProducts();
  }

  private searchForProducts() {
    this.productSearchBuilder.setContains('productName', this.productSearch.controls.search.value).build();
    console.log(this.productSearchBuilder.query);
    this.webService.getProductsByQuery(this.productSearchBuilder.query)
      .subscribe((data: Product[]) => {
          this.productList = data.map(
            (product) => {
              return new Product()
                .setID(product.productID)
                .setBrand(product.productBrand)
                .setName(product.productName)
                .setPrice(product.productPrice)
                .setSku(product.productSKU)
                .build();
            }
          );
          this.searchComplete = true;
          this.initPages();
        },
        (error: Data) => {
          console.log(error);
        });
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
    this.router.navigate(['/products/'+index]);
  }

  onCreate() {
    this.router.navigate(['/products/create']);
  }
}
