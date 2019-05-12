import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
  readonly maxToAdd = 5;

  constructor(private createService: CreateProductService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.productForm = new FormGroup({
      productSKU: new FormControl(null, [Validators.required, this.createService.mustBeEight.bind(this), Validators.pattern(/^[0-9]{8}$/)]),
      productName: new FormControl(null,[Validators.required, Validators.pattern(/^[\w\s]+$/i)]),
      productBrand: new FormControl(null,[Validators.required]),
      productPrice: new FormControl(null,[Validators.required, this.createService.minimumZeroValue.bind(this)]),
      productStartFactor: new FormControl(null,[Validators.required, this.createService.minimumValue.bind(this)]),
      productVariableCost: new FormControl(null,[Validators.required, this.createService.minimumValue.bind(this)]),
      productGrowthFactor: new FormControl(null,[Validators.required, this.createService.minimumValue.bind(this)]),
      productsInsertMaterials: this.formBuilder.array([]),
      productQuantity: new FormControl(null, [this.createService.minimumZeroValue.bind(this)])
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

  /**
   * Med hjælp og inspiration fra:
   * https://angularfirebase.com/lessons/basics-reactive-forms-in-angular/
   */
  get materialForms() {
    return this.productForm.controls.productsInsertMaterials as FormArray;
  }

  addMaterial() {
    const materialArray = this.formBuilder.group({
      MaterialName: [null, [Validators.required, this.maximumLimitMaterials.bind(this)]]
    });

    this.materialForms.push(materialArray);
    console.log(this.materialForms.length);
  }

  removeMaterial(index: number) {
    this.materialForms.removeAt(index);
  }

  /**
   * VALIDATORS
   */

  maximumLimitMaterials(control: AbstractControl): { [key: string]: boolean } | null {
    if (this.materialForms.length > this.maxToAdd) {
      return {'maximumError': true}
    }
    return null;
  }
}
