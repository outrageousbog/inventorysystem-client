import { Component, OnInit } from '@angular/core';
import {Brand} from '../../shared/views/brand';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BrandSearchBuilder} from '../../shared/search/brands/brand.search';
import {PaginatorService} from '../../shared/pages/paginator.service';
import {SearchService} from '../../shared/search/search.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchTypes} from '../../shared/search/search-types';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {

  protected brandList: Brand[];
  protected brandSearch: FormGroup;
  searchComplete: boolean = false;
  brandSearchBuilder: BrandSearchBuilder = new BrandSearchBuilder()
  protected toShow: number = 10;
  pageService: PaginatorService = new PaginatorService();

  optionsToShow = [
    {name : "5", value: 5},
    {name : "10", value: 10},
    {name : "25", value: 25},
    {name : "50", value: 50},
  ];

  constructor(private searchService: SearchService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.brandSearch = new FormGroup({
      'search': new FormControl(null, [Validators.required])
    });

    this.searchService.brandsSearchObs
      .subscribe(
        (data: Brand[]) => {
          this.brandList = data;
          this.searchComplete = true;
          this.initPages();
        }
      );
  }

  onSubmit() {
    console.log(this.brandSearch.controls.search.value);
    this.searchForBrands();
  }

  private searchForBrands() {
    let searchValue = this.brandSearch.controls.search.value;
    if (searchValue != null){
      this.brandSearchBuilder.withContains('brandName', this.brandSearch.controls.search.value);
    }
    let searchQuery = this.brandSearchBuilder.build();
    console.log(this.brandSearchBuilder.build());
    this.searchService.search(SearchTypes.Brand, searchQuery.query);
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

  onCreate() {
    this.router.navigate(['create'], {relativeTo: this.route});
  }

}
