import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {BrandService} from '../brand-service';
import {Product} from '../../shared/views/product';

@Component({
  selector: 'app-brand-information',
  templateUrl: './brand-information.component.html',
  styleUrls: ['./brand-information.component.css']
})
export class BrandInformationComponent implements OnInit {
  productList: Product[];
  moreThanZero = false;
  brandName: string;

  constructor(private location: Location,
              private route: ActivatedRoute,
              private brandService: BrandService,
              private router: Router) { }

  ngOnInit() {
    this.route.data
      .subscribe(
        (data: Data) => {
          let productObject = data['brandProduct'];
          this.productList = this.brandService.getProductsFromJson(productObject);

          this.productList.length > 0 ? this.setInitialValues() : null;
        }
      )
  }

  private setInitialValues() {
    this.moreThanZero = true;
    this.brandName = this.productList[0].productBrand;
  }

  onBack() {
    this.location.back();
  }

  onProductClick(productID: string) {
    this.router.navigate(['/main/products/'+productID]);
  }
}
