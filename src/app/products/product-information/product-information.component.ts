import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebService} from '../../shared/web/web.service';
import {Product, ProductBuilder} from '../../shared/views/product';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Location} from '@angular/common';
import {ProductService} from '../product-service';
import {Material} from '../../shared/views/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.css']
})
export class ProductInformationComponent implements OnInit {
  product: Product;
  materials: Material[];
  isDeleted = false;
  editMode = false;
  editForm: FormGroup;

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
          let materialObject = data['material'];
          console.log(data);
          this.product = this.productService.getProductFromJson(productObject);
          this.materials = this.productService.getMaterialFromJson(materialObject);
          console.log(this.materials);
        }
      );

    this.editForm = new FormGroup({
      'productID': new FormControl(this.product.productID),
      'productQuantity': new FormControl(this.product.productQuantity, [Validators.required])
    });
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

  onEdit() {
    this.editMode = true;
  }

  onCancel() {
    this.editMode = false;
  }

  onSave() {
    this.editMode = false;
    this.productService.updateQuantity(this.editForm.value);
    console.log(this.editForm.controls);
  }

}
