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
  materialList: Material[];
  materialSearch: FormGroup;
  searchComplete: boolean = false;

  constructor(private materialService: MaterialService,
              public pageService: PaginatorService) {}


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
    this.searchForMaterials();
  }

  private searchForMaterials() {
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
}
