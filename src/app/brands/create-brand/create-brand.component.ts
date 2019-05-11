import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {WebService} from '../../shared/web/web.service';
import {BrandBuilder} from '../../shared/views/brand';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-create-brand',
  templateUrl: './create-brand.component.html',
  styleUrls: ['./create-brand.component.css']
})
export class CreateBrandComponent implements OnInit {

  brandForm: FormGroup;
  createComplete = false;

  constructor(private webService: WebService,
              private location: Location) {}

  ngOnInit() {
    this.brandForm = new FormGroup({
      'productBrandName' : new FormControl(null, [Validators.required])
    })
  }

  onSubmit() {
    let brandSearch = new BrandBuilder();
    this.webService.createBrand(this.brandForm.value)
      .subscribe(
        () => {
          this.brandForm.reset();
          this.createComplete = true;
        }
      )
  }

  onClose() {
    this.createComplete = false;
  }

  onReturn() {
    this.location.back();
  }
}
