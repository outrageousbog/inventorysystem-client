import {Component, OnInit} from '@angular/core';
import {Brand} from '../../shared/views/brand';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PaginatorService} from '../../shared/pages/paginator.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BrandService} from '../brand-service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css'],
  providers: [PaginatorService]
})
export class BrandListComponent implements OnInit {

  brandList: Brand[];
  brandSearch: FormGroup;
  searchComplete: boolean = false;

  constructor(private brandService: BrandService,
              private router: Router,
              private route: ActivatedRoute,
              public pageService: PaginatorService) {}

  ngOnInit() {
    this.brandSearch = new FormGroup({
      'search': new FormControl(null, [Validators.required])
    });

    this.brandList = this.brandService.getBrandsList();
    if (this.brandList.length > 0) {
      this.searchComplete = true;
      this.initPages();
    } else {
      this.searchComplete = false;
    }

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
      this.pageService.initPages(0);
    }
    else {
      this.pageService.initPages(this.brandList.length);
    }
  }

  onCreate() {
    this.router.navigate(['create'], {relativeTo: this.route});
  }

  onBrandClick(name: string) {
    this.router.navigate(['/main/brands/' + name.toLowerCase()]);
  }
}
