import {Injectable} from '@angular/core';
import {WebService} from '../../shared/web/web.service';
import {Brand, BrandBuilder} from '../../shared/views/brand';
import {Subject} from 'rxjs';
import {Error} from 'tslint/lib/error';
import {Material, MaterialBuilder} from '../../shared/views/material';
import {FormGroup} from '@angular/forms';
import {Data} from '@angular/router';

@Injectable()
export class CreateProductService {
  private brandArray: Brand[];
  private materialArray: Material[];

  public materialSubject = new Subject();
  public brandSubject = new Subject();
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
        (data: Error) => {
          console.log(data);
        }
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
        (data: Data) => {
          console.log(data);
        }
      )
  }
}
