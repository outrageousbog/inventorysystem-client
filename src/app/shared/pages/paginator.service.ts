import {Injectable, NgModule} from '@angular/core';

@Injectable()
export class PaginatorService {
  pageList: number[];
  currentPage: number = 0;
  previousButton: boolean = false;
  nextButton: boolean = false;
  amountProducts: number = 0;
  pagesToShowInView: number = 5;
   toShow: number = 10;

  optionsToShow = [
    {name : "5", value: 5},
    {name : "10", value: 10},
    {name : "25", value: 25},
    {name : "50", value: 50},
  ];

  showPagesTo() {
    return this.toShow * (this.currentPage + 1);
  }

  showPagesFrom() {
    return this.toShow * (this.currentPage);
  }

  setCurrentPage(chosenPage: number) {
    // TODO if more than 5 pages, dynamically change pages, so the chosen is in the middle
    // if (this.amountProducts > this.pagesToShowInView) {
    //   if ((this.amountProducts - chosenPage) >= (this.pagesToShowInView / 2) || chosenPage <= (this.pagesToShowInView / 2)) {
    //     for (let i of this.pageList) {
    //       this.pageList[i] = this.pageList[i] +1;
    //     }
    //   }
    //   else {
    //     this.currentPage = chosenPage;
    //   }
    // }
    this.currentPage = chosenPage;

    this.updateVariables();
  }

  initPages(amountProducts: number) {
    this.amountProducts = amountProducts;
    this.pageList = this.fillArrayWithNumbers(Math.ceil(this.amountProducts / this.toShow));

    this.currentPage = 0;
    this.updateVariables();
  }

  private fillArrayWithNumbers(n: number) {
    let arr = Array.apply(null, Array(n));
    return arr.map(function (x, i) {
      return i;
    });
  }

  checkForButtonChanges() {
    (this.currentPage > 0) ? this.previousButton = true : this.previousButton = false;
    (this.currentPage < this.pageList.length - 1) ? this.nextButton = true : this.nextButton = false;
  }

  private updateVariables() {
    this.checkForButtonChanges();
    this.showPagesFrom();
    this.showPagesTo();
  }

  setToShow() {
    this.initPages(this.amountProducts);
  }
}
