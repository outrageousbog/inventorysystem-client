import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebService} from '../../shared/web/web.service';
import {Product, ProductBuilder} from '../../shared/views/product';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Location} from '@angular/common';
import {ProductService} from '../product-list/product-service';

@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.css']
})
export class ProductInformationComponent implements OnInit {
  product: Product;
  private id: number;
  protected isSearched: boolean = false;

  constructor(private webService: WebService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit() {
    this.route.data
      .subscribe(
        (data: Data) => {
          console.log(data['product']);
          this.product = data['product'];
        }
      );
  }



  deleteProduct() {
    this.webService.deleteProduct(this.product.productID)
      .subscribe(
        (data: Data) => {
          console.log(data);
        },
        (error: Data) => {
          console.log(error);
        }
      )
  }

  onBack() {
    this.location.back();
  }
}
