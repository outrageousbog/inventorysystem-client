import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {BrandService} from '../brand-service';
import {Product} from '../../shared/views/product';
import {Brand} from '../../shared/views/brand';

@Component({
  selector: 'app-brand-information',
  templateUrl: './brand-information.component.html',
  styleUrls: ['./brand-information.component.css']
})
export class BrandInformationComponent implements OnInit {
  productList: Product[];
  moreThanZero = false;
  brandExist = false;
  brand: Brand;
  isDeleted: boolean = true;

  constructor(private location: Location,
              private route: ActivatedRoute,
              private brandService: BrandService,
              private router: Router) { }

  ngOnInit() {
    this.route.data
      .subscribe(
        (data: Data) => {
          let productObject = data['brandProduct'];
          let brandObject = data['brand'];
          this.productList = this.brandService.getProductsFromJson(productObject);
          this.brand = this.brandService.getBrandFromJson(brandObject);
          (this.brand) ? this.setBrand() : null;
          this.productList.length > 0 ? this.moreThanZero = true : null;
        }
      );

    this.brandService.brandsDeleteSub
      .subscribe(
        () => {
          this.isDeleted = true;
        }
      )
  }
  private setBrand() {
    this.brandExist = true;
    this.isDeleted = false;
  }

  onBack() {
    this.location.back();
  }

  onDelete() {
    this.brandService.deleteBrand(this.brand.brandID);
  }

  onProductClick(productID: string) {
    this.router.navigate(['/main/products/'+productID]);
  }

  allowedToDelete() {
    return this.brandExist && !this.moreThanZero && !this.isDeleted;
  }
}
