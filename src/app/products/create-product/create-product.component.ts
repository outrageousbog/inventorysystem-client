import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CreateProductService} from './create-product.service';
import {Brand} from '../../shared/views/brand';
import {Material} from '../../shared/views/material';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
  providers: [CreateProductService]
})
export class CreateProductComponent implements OnInit {
  productForm: FormGroup;
  brandList: Brand[];
  materialList: Material[];

  constructor(private createService: CreateProductService) { }

  ngOnInit() {
    this.productForm = new FormGroup({
      productSKU: new FormControl(12345678),
      productName: new FormControl('Eris E5'),
      productBrand: new FormControl('Presonus'),
      productMaterialsID: new FormControl(4),
      productPrice: new FormControl(2000),
      productVariableCost: new FormControl(1500),
      productStartFactor: new FormControl(400),
      productGrowthFactor: new FormControl(20)
    });

    this.createService.materialSubject
      .subscribe(
        (materialArray: Material[]) => {
          this.materialList = materialArray;
          console.log(this.materialList);
        }
      );

    this.createService.brandSubject
      .subscribe(
        (brandArray: Brand[]) => {
          this.brandList = brandArray;
          console.log(this.brandList);
        }
      );


    this.createService.getBrands();
    this.createService.getMaterials();
  }

  onSubmit() {
    console.log(this.productForm.value);
    this.createService.createProduct(this.productForm.value);
  }
}
