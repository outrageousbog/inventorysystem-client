import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Product} from '../shared/views/product';
import {Router} from '@angular/router';
import {PaginatorService} from '../shared/pages/paginator.service';
import {ProductSearchBuilder} from '../shared/search/products/product.search';
import {SearchService} from '../shared/search/search.service';
import {SearchTypes} from '../shared/search/search-types';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [SearchService],
})
export class ProductsComponent implements OnInit {
  protected productList: Product[] = [null];
  protected productSearch: FormGroup;
  protected productSearchBuilder = new ProductSearchBuilder();
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
              private searchService: SearchService) { }

  ngOnInit() {
    this.productSearch = new FormGroup({
      'search': new FormControl(null, [Validators.required])
    });

    this.searchService.productsSearchObs
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
    let searchValue = this.productSearch.controls.search.value;
    if (searchValue != null) {
      this.productSearchBuilder.withContains('productName', this.productSearch.controls.search.value)
    }
    let searchQuery = this.productSearchBuilder.build();
    console.log(searchQuery.query);
    this.searchService.search(SearchTypes.Product, searchQuery.query);
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
