import { Component, OnInit } from '@angular/core';
import {WebService} from '../shared/web.service';
import {Brand} from '../shared/views/brand';
import {Data} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BrandSearchBuilder} from '../shared/search/brand-search.builder';
@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  protected brandList: Brand[];
  protected brandSearch: FormGroup;
  searchComplete: boolean = false;
  brandSearchBuilder: BrandSearchBuilder;
  protected toShow: number = 10;

  optionsToShow = [
    {name : "10", value: 10},
    {name : "25", value: 25},
    {name : "50", value: 50},
  ]

  constructor(private webService: WebService) { }

  ngOnInit() {
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
          console.log(data);
          this.brandList = data.map(
            (brand) => {
              return new Brand(brand.brandID, brand.brandName);
            }
          );
          this.searchComplete = true;
        },
        (error: Data) => {
          console.log(error);
        });
  }

  private getAllBrands() {
    this.webService.getBrands()
      .subscribe((data: Brand[]) => {
          console.log(data);
          this.brandList = data.map(
            (brand) => {
              return new Brand(brand.brandID, brand.brandName);
            }
          );
          this.searchComplete = true;
        },
        (error: Data) => {
          console.log(error);
        });
  }

  setSort(toSort: number) {
    switch (toSort) {
      case 0: this.brandSearchBuilder.setOrderBy('brandName'); break;
      case 1: this.brandSearchBuilder.setOrderBy('id'); break;
    }
  }

  setShowMax(value: string) {
    this.toShow = +value;
  }
}
