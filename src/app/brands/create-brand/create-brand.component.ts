import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {WebService} from '../../shared/web/web.service';
import {BrandBuilder} from '../../shared/views/brand';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-brand',
  templateUrl: './create-brand.component.html',
  styleUrls: ['./create-brand.component.css']
})
export class CreateBrandComponent implements OnInit {

  brandForm: FormGroup;
  protected createComplete = false;

  constructor(private webService: WebService,
              private router: Router) { }

  ngOnInit() {
    this.brandForm = new FormGroup({
      'brand' : new FormControl(null, [Validators.required])
    })
  }

  onSubmit() {
    let brandSearch = new BrandBuilder();
    this.webService.createBrand(brandSearch.withName(this.brandForm.controls.brand.value).build())
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
    this.router.navigate(['/brands'])
  }
}
