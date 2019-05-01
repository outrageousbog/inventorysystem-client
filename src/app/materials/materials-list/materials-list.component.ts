import { Component, OnInit } from '@angular/core';
import {Material} from '../../shared/views/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MaterialService} from '../material.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PaginatorService} from '../../shared/pages/paginator.service';

@Component({
  selector: 'app-materials-list',
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.css'],
  providers: [PaginatorService]
})
export class MaterialsListComponent implements OnInit {
  protected materialList: Material[];
  protected materialSearch: FormGroup;
  searchComplete: boolean = false;

  constructor(private materialService: MaterialService,
              private router: Router,
              private pageService: PaginatorService,
              private route: ActivatedRoute) {}


  ngOnInit() {

    this.materialSearch = new FormGroup({
      'search': new FormControl(null, [Validators.required])
    });

    this.materialList = this.materialService.getMaterialsList();
    if (this.materialList.length > 0) {
      this.searchComplete = true;
      this.initPages();
    } else {
      this.searchComplete = false;
    }

    this.materialService.materialSearchSubject
      .subscribe(
        (data: Material[]) => {
          this.materialList = data;
          this.searchComplete = true;
          this.initPages();
        }
      );
  }

  onSubmit() {
    console.log(this.materialSearch.controls.search.value);
    this.searchForBrands();
  }

  private searchForBrands() {
    this.materialService.search(this.materialSearch.controls.search.value);
  }

  updatePages(newPage: number) {
    this.pageService.setCurrentPage(newPage);
  }

  initPages () {
    if (this.materialList == null ) {
      this.pageService.initPages(0);
    }
    else {
      this.pageService.initPages(this.materialList.length);
    }
  }

  onCreate() {
    this.router.navigate(['create'], {relativeTo: this.route});
  }
}
