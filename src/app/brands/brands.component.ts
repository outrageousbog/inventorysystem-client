import { Component, OnInit } from '@angular/core';
import {WebService} from '../shared/web/web.service';
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
  protected currentPage: number = 1;
  protected pageList: number[];

  previousButton: boolean = false;
  nextButton: boolean = false;

 optionsToShow = [
    {name : "10", value: 10},
    {name : "25", value: 25},
    {name : "50", value: 50},
  ];

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
          this.brandList = data.map(
            (brand) => {
              return new Brand(brand.brandID, brand.brandName);
            }
          );
          this.searchComplete = true;
          this.initPages();
        },
        (error: Data) => {
          console.log(error);
        });
  }

  showPagesFrom() {
    return this.toShow*(this.currentPage-1);
  }

  showPagesTo() {
    return this.toShow*(this.currentPage);
  }

  initPages () {
    if (this.brandList == null ) {
      this.pageList = new Array(0)
    }
    else {
      this.pageList = this.fillArrayWithNumbers(Math.ceil(this.brandList.length / this.toShow));
      console.log(this.pageList);
      this.checkForButtonChanges(this.pageList[0]);
    }
  }

  setCurrentPage(chosenPage: number) {

    if (this.pageList.length > 5) {
      if ((this.pageList.length - chosenPage) >= 2 || chosenPage <= 2) {
        for (let i of this.pageList) {
          this.pageList[i] = this.pageList[i] +1;
        }
      }
      else {
        this.currentPage = chosenPage;
      }
    }
      this.currentPage = chosenPage;

    this.checkForButtonChanges(chosenPage);
  }

  increasePage() {
    this.setCurrentPage(this.currentPage+1);
  }

  decreasePage() {
    this.setCurrentPage(this.currentPage-1);
  }

  fillArrayWithNumbers(length: number) {
    var arr = Array.apply(null, Array(length));
    return arr.map( function (x,i) {
        return i;
    })
  }

  private checkForButtonChanges(chosenPage: number) {
    (chosenPage > 1)? this.previousButton = true : this.previousButton = false;
    (chosenPage < this.pageList.length)? this.nextButton=true : this.nextButton = false;
    // if (chosenPage < this.pageList.length) {
    //   this.nextButton = true;
    // } else if (chosenPage >= this.pageList.length) {
    //   this.nextButton = false;
    // }
  }
}
