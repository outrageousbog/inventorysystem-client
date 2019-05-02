import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebService} from '../../shared/web/web.service';
import {Product, ProductBuilder} from '../../shared/views/product';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Location} from '@angular/common';
import {ProductService} from '../product-service';

@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.css']
})
export class ProductInformationComponent implements OnInit {
  product: Product;
  private id: number;
  protected isSearched: boolean = false;
  isDeleted = false;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private location: Location,
              private webService: WebService) {
  }

  ngOnInit() {
    console.log('is loaded');
    this.route.data
      .subscribe(
        (data: Data) => {
          let productObject = data['product'];
          this.product = this.productService.getProductFromJson(productObject);
        }
      );
  }



  deleteProduct() {
    if (confirm(`Are you sure, you want to delete ${this.product.productName}`)){
      this.webService.deleteProduct(this.product.productID)
        .subscribe(
          (data: Data) => {
            console.log(data);
            this.isDeleted = true;
          },
          (error: Data) => {
            console.log(error);
          }
        )
    }

  }

  onBack() {
    this.location.back();
  }

  onClose() {
    this.isDeleted = false;
    this.onBack();
  }
}
