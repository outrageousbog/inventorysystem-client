import { Component, OnInit } from '@angular/core';
import {WebService} from '../shared/web.service';
import {Brand} from '../shared/views/brand';
import {Data} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  protected brandList: Brand[];
  protected brandSearch: FormGroup;
  searchComplete: boolean = false;

  constructor(private webService: WebService) { }

  ngOnInit() {
    this.brandSearch = new FormGroup({
      'search': new FormControl(null, [Validators.required])
    });

  }

  onSubmit() {
    console.log(this.brandSearch.controls.search.value);
    this.searchForBrands();
  }

  private searchForBrands() {
    this.webService.getBrandsByName(this.brandSearch.controls.search.value)
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
}
