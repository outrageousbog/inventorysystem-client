import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
  n=1;

  constructor(private createService: CreateProductService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.productForm = new FormGroup({
      productSKU: new FormControl(12345678, [Validators.required]),
      productName: new FormControl('Eris E5',[Validators.required]),
      productBrand: new FormControl('Presonus',[Validators.required]),
      productPrice: new FormControl(2000,[Validators.required]),
      productVariableCost: new FormControl(1500,[Validators.required]),
      productStartFactor: new FormControl(400,[Validators.required]),
      productGrowthFactor: new FormControl(20,[Validators.required]),
      productMaterialsID: this.formBuilder.array([])
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
    //this.createService.createProduct(this.productForm.value);
  }

  /**
   * Med hjælp og inspiration fra:
   * https://angularfirebase.com/lessons/basics-reactive-forms-in-angular/
   */
  get materialForms() {
    return this.productForm.controls.productMaterialsID as FormArray;
  }

  addMaterial() {
    const materialArray = this.formBuilder.group({
      materialName: [null, [Validators.required]]
    });

    this.materialForms.push(materialArray);
  }

  removeMaterial(index: number) {
    this.materialForms.removeAt(index);
  }
}
