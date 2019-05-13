import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebService} from '../../shared/web/web.service';
import {Product, ProductBuilder} from '../../shared/views/product';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Location} from '@angular/common';
import {ProductService} from '../product-service';
import {Material} from '../../shared/views/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CreateProductService} from '../create-product/create-product.service';

@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.css'],
  providers: [CreateProductService]
})
export class ProductInformationComponent implements OnInit {
  product: Product;
  materials: Material[];
  isDeleted = false;
  editMode = false;
  editForm: FormGroup;
  loaded = false;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private createProductService: CreateProductService) {
  }

  ngOnInit() {
    this.route.data
      .subscribe(
        (data) => {
          if (data['product'].length > 0){
            let productObject = data['product'];
            let materialObject = data['material'];
            this.product = this.productService.getProductFromJson(productObject);
            this.materials = this.productService.getMaterialFromJson(materialObject);
            this.initForm();
            this.loaded = true;
          }

        }
      );

    this.productService.deleteEmitter
      .subscribe(
        () => {
          this.isDeleted = true;
        }
      );

    this.productService.productUpdateSub
      .subscribe(
        (data: Product) => {
          this.product = data;
        }
      );
  }

  private initForm() {
    this.editForm = new FormGroup({
      productID: new FormControl(this.product.productID),
      productQuantity: new FormControl(this.product.productQuantity, [Validators.required, this.createProductService.minimumZeroValue.bind(this), this.createProductService.maxValue.bind(this)]),
      productName: new FormControl(this.product.productName,[Validators.required, Validators.pattern(/^[\w\s]+$/i)]),
      productBrand: new FormControl(this.product.productBrand,[Validators.required]),
      productStartFactor: new FormControl(this.product.productStartFactor, this.createProductService.maxValue.bind(this)),
      productGrowthFactor: new FormControl(this.product.productGrowthFactor, this.createProductService.maxValue.bind(this)),
      productSKU: new FormControl(this.product.productSKU, [Validators.required, this.createProductService.mustBeEight.bind(this), Validators.pattern(/^[0-9]{8}$/)]),
      productPrice: new FormControl(this.product.productPrice,[Validators.required, this.createProductService.minimumZeroValue.bind(this), this.createProductService.maxValue.bind(this)]),
      productVariableCost: new FormControl(this.product.productVariableCost,[Validators.required, this.createProductService.minimumValue.bind(this),this.createProductService.maxValue.bind(this)]),
    });
  }



  deleteProduct() {
    if (confirm(`Are you sure, you want to delete ${this.product.productName}`)){
        this.productService.deleteProduct(this.product.productID);
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
    this.productService.updateProduct(this.editForm.value);
  }

}
