import { Component, OnInit } from '@angular/core';
import {WebService} from '../shared/web/web.service';
import {Brand, BrandBuilder} from '../shared/views/brand';
import {Data} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BrandSearchBuilder} from '../shared/search/brand-search.builder';
import {PaginatorService} from '../shared/pages/paginator.service';
@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
})
export class BrandsComponent implements OnInit {
  protected brandList: Brand[];
  protected brandSearch: FormGroup;
  searchComplete: boolean = false;
  brandSearchBuilder: BrandSearchBuilder;
  protected toShow: number = 10;
  pageService: PaginatorService;

  optionsToShow = [
    {name : "5", value: 5},
    {name : "10", value: 10},
    {name : "25", value: 25},
    {name : "50", value: 50},
  ];

  constructor(private webService: WebService) { }

  ngOnInit() {
    this.pageService = new PaginatorService();
    this.brandSearch = new FormGroup({
      'search': new FormControl(null, [Validators.required])
    });
    this.brandSearchBuilder = new BrandSearchBuilder()
  }

  onSubmit() {
    console.log(this.brandSearch.controls.search.value);
    this.searchForBrands();
  }

  private searchForBrands() {
    this.brandSearchBuilder.setContains('brandName', this.brandSearch.controls.search.value).build();
    console.log(this.brandSearchBuilder.query);
    this.webService.getBrandsByQuery(this.brandSearchBuilder.query)
      .subscribe((data: Brand[]) => {
          this.brandList = data.map(
            (brand) => {
              return new BrandBuilder()
                .withID(brand.brandID)
                .withName(brand.brandName)
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

  initPages () {
    if (this.brandList == null ) {
      this.pageService.initPages(0, this.toShow);
    }
    else {
      this.pageService.initPages(this.brandList.length, this.toShow);
    }
  }
}
