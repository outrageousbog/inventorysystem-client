import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CreateProductService} from './create-product.service';
import {Brand} from '../../shared/views/brand';
import {Material} from '../../shared/views/material';
import {Location} from '@angular/common';

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
  createdCompleted = false;
  invalidOrder = false;
  readonly maxToAdd = 5;

  constructor(private createService: CreateProductService,
              private formBuilder: FormBuilder,
              private location: Location) {
  }

  ngOnInit() {
    this.productForm = new FormGroup({
      productSKU: new FormControl(null, [Validators.required, this.createService.mustBeEight.bind(this), Validators.pattern(/^[0-9]{8}$/)]),
      productName: new FormControl(null, [Validators.required, Validators.pattern(/^[\w\s]+$/i)]),
      productBrand: new FormControl(this.showDefaultValue(), [Validators.required]),
      productPrice: new FormControl(0, [Validators.required, this.createService.minimumZeroValue.bind(this)]),
      productStartFactor: new FormControl(null, [Validators.required, this.createService.minimumValue.bind(this)]),
      productVariableCost: new FormControl(null, [Validators.required, this.createService.minimumValue.bind(this)]),
      productGrowthFactor: new FormControl(null, [Validators.required, this.createService.minimumValue.bind(this)]),
      productsInsertMaterials: this.formBuilder.array([]),
      productQuantity: new FormControl(0, [Validators.required, this.createService.minimumZeroValue.bind(this)])
    });

    this.createService.materialSubject
      .subscribe(
        (materialArray: Material[]) => {
          this.materialList = materialArray;
        }
      );

    this.createService.brandSubject
      .subscribe(
        (brandArray: Brand[]) => {
          this.brandList = brandArray;
        }
      );

    this.createService.createdSubject
      .subscribe(
        () => {
          this.createdCompleted = true;
          this.createdTimer();
        }
      );

    this.createService.getBrands();
    this.createService.getMaterials();
  }

  onSubmit() {
    (this.checkForOrder()) ? this.createService.createProduct(this.productForm.value) : this.displayError();
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
  }

  removeMaterial(index: number) {
    this.materialForms.removeAt(index);
  }


  createdTimer() {
    setTimeout(
      () => {
        this.createdCompleted = false;
      }, 5000
    );
  }

  onClose() {
    this.location.back();
  }

  /**
   * VALIDATORS
   */

  maximumLimitMaterials(control: AbstractControl): { [key: string]: boolean } | null {
    if (this.materialForms.length > this.maxToAdd) {
      return {'maximumError': true};
    }
    return null;
  }

  checkForOrder() {
    const start = this.productForm.controls.productStartFactor.value;
    const variable = this.productForm.controls.productVariableCost.value;
    const growth = this.productForm.controls.productGrowthFactor.value;
    return (+start > +variable && +variable > +growth);
  }

  private displayError() {
    this.invalidOrder = true;
    setTimeout(
      () => {
        this.invalidOrder = false;
      }, 7500
    );
  }

  private showDefaultValue() {
    if (this.brandList) {
      if (this.brandList.length > 0) {
        return this.brandList[0];
      }
    } else {
      return null;
    }
  }
}
