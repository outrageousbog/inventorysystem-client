import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {WebService} from '../../shared/web/web.service';
import {BrandBuilder} from '../../shared/views/brand';
import {BrandSearchBuilder} from '../../shared/search/brands/brand.search';

@Component({
  selector: 'app-create-brand',
  templateUrl: './create-brand.component.html',
  styleUrls: ['./create-brand.component.css']
})
export class CreateBrandComponent implements OnInit {

  brandForm: FormGroup;
  createComplete = false;

  constructor(private webService: WebService) {}

  ngOnInit() {
    this.brandForm = new FormGroup({
      'brandName' : new FormControl(null, [Validators.required])
    })
  }

  onSubmit() {
    new BrandBuilder();
    this.webService.createBrand(this.brandForm.value)
      .subscribe(
        () => {
          this.brandForm.reset();
          this.createComplete = true;
          const query = new BrandSearchBuilder().build().query;
          this.webService.getBrandsByQuery(query)
        }
      )
  }

  onClose() {
    this.createComplete = false;
  }
}
