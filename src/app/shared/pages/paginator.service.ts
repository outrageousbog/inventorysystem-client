import {Injectable, NgModule} from '@angular/core';

@Injectable()
export class PaginatorService {
  pageList: number[];
  currentPage: number = 0;
  previousButton: boolean = false;
  nextButton: boolean = false;
  toShow: number = 10;
  amountProducts: number = 0;
  pagesToShowInView: number = 5;

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

  initPages(amountProducts: number, toShow: number) {
    this.amountProducts = amountProducts;
    this.toShow = toShow;
    this.pageList = this.fillArrayWithNumbers(Math.ceil(this.amountProducts / this.toShow));

    this.updateVariables();
    this.currentPage = 0;
    console.log(this.pageList);
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

  setToShow(newToShow: number) {
    this.initPages(this.amountProducts, newToShow);
  }
}
