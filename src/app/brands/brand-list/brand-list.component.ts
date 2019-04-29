import {Component, OnInit} from '@angular/core';
import {Brand} from '../../shared/views/brand';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PaginatorService} from '../../shared/pages/paginator.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BrandService} from './brand-service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css'],
})
export class BrandListComponent implements OnInit {

  protected brandList: Brand[];
  protected brandSearch: FormGroup;
  searchComplete: boolean = false;
  protected toShow: number = 10;
  pageService: PaginatorService = new PaginatorService();

  optionsToShow = [
    {name : "5", value: 5},
    {name : "10", value: 10},
    {name : "25", value: 25},
    {name : "50", value: 50},
  ];

  constructor(private brandService: BrandService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.brandSearch = new FormGroup({
      'search': new FormControl(null, [Validators.required])
    });

    this.brandService.brandsSearchObs
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
    this.brandService.search(this.brandSearch.controls.search.value);
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
