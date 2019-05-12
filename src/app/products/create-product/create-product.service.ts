import {Injectable} from '@angular/core';
import {WebService} from '../../shared/web/web.service';
import {Brand, BrandBuilder} from '../../shared/views/brand';
import {Subject} from 'rxjs';
import {Material, MaterialBuilder} from '../../shared/views/material';
import {AbstractControl, FormGroup} from '@angular/forms';
import {ProductSearchBuilder} from '../../shared/search/products/product.search';

@Injectable()
export class CreateProductService {
  private brandArray: Brand[];
  private materialArray: Material[];
  public materialSubject = new Subject();
  public brandSubject = new Subject();
  public createdSubject = new Subject();
  constructor(private webService: WebService) {}

  getBrands() {
    this.webService.getBrands()
      .subscribe(
        (brand: Brand[]) => {
          this.brandArray = brand.map(
            (brand) => {
              return new BrandBuilder()
                .withID(brand.brandID)
                .withName(brand.brandName)
                .build()
            }
          );
          this.brandSubject.next(this.brandArray);
        },
      )
  }

  getMaterials() {
    this.webService.getMaterials()
      .subscribe(
        (material: Material[]) => {
          this.materialArray = material.map(
            (material) => {
              return new MaterialBuilder()
                .withID(material.materialID)
                .withName(material.materialName)
                .build()
            }
          );
          this.materialSubject.next(this.materialArray);
        }
      )
  }

  createProduct(brand: FormGroup) {
    this.webService.createProduct(brand)
      .subscribe(
        () => {
          const query = new ProductSearchBuilder().build().query;
          this.webService.getProductsByQuery(query)
          this.createdSubject.next();
        }
      )
  }

  minimumZeroValue(control: AbstractControl): {[key: string]: boolean} | null {
    if (Number(control.value) < 0) {
      return {
        'minimumQuantity': true
      };
    }
    return null;
  }
   minimumValue(control: AbstractControl): {[key: string]: boolean} | null {
    if (Number(control.value) < 1) {
      return {
        'aboveZero': true
      };
    }
    return null;
  }

  mustBeEight(control: AbstractControl): {[key: string] : boolean} | null {
    if (String(control.value).length != 8) {
      return {
        'notEight': true
      };
    }
    return null;
  }
}
