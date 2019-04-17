import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Product} from '../shared/views/product';
import {WebService} from '../shared/web/web.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  protected productList: Product[];
  protected productSearch: FormGroup;
  protected searched: boolean = false;

  constructor(private webService: WebService) { }

  ngOnInit() {
    this.productSearch = new FormGroup({
      'nameSearch': new FormControl(null, [Validators.required])
    })
  }

  onSubmit() {
    this.webService.getProducts()
      .subscribe(
        (data: Product[]) => {
          this.productList = data.map(
            (product) => {
              return new Product(product.productSKU, product.productName, product.productBrand, product.productPrice);
            }
          );
          console.log(this.productList);
          this.searched = true;

        },
        (error: Error) => {
          console.log("Error occured: " + error);
        }
      );
  }
}
