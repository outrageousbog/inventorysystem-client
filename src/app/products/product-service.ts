import {EventEmitter, Injectable} from '@angular/core';
import {ProductSearchBuilder} from '../shared/search/products/product.search';
import {WebService} from '../shared/web/web.service';
import {Subject} from 'rxjs';
import {Product, ProductBuilder} from '../shared/views/product';
import {Data} from '@angular/router';
import {Material, MaterialBuilder} from '../shared/views/material';
import {FormGroup} from '@angular/forms';

@Injectable()
export class ProductService {
  productsSearchObs = new Subject();
  private product = new Product();
  private productsArray: Product[] = [];
  deleteEmitter = new EventEmitter();

  constructor(private webService: WebService) {}

  private searchProducts(query: string) {
    this.webService.getProductsByQuery(query)
      .subscribe((data: Product[]) => {
          this.productsArray = data.map(
            (product) => {
              return new ProductBuilder()
                .withName(product.productName)
                .withPrice(product.productPrice)
                .withBrand(product.productBrand)
                .withAmount(product.productQuantity)
                .withID(product.productID)
                .build();
            }
          );
          this.productsSearchObs.next(this.productsArray)
          console.log(this.productsArray);
        },
        (error: Data) => {
          console.log(error);
        });
  }

  getProductsArray() {
    return this.productsArray.slice();
  }

  search(formGroup: FormGroup) {
    let productSearchBuilder = new ProductSearchBuilder();
    let search = formGroup.controls.search.value;
    let onlyStock = formGroup.controls.onlyStock.value;

    if (search != null) {
      productSearchBuilder.withContains('productName', search)
    }
    productSearchBuilder.withOnlyStock(onlyStock);
    let searchQuery = productSearchBuilder.build();
    this.searchProducts(searchQuery.query);
  }

  getProductFromJson(productObject: Product[]) {
    let tempProd: Product[] = productObject.map(
      (product) => {
        return new ProductBuilder()
          .withVariableCosts(product.productVariableCost)
          .withBrand(product.productBrand)
          .withName(product.productName)
          .withSKU(product.productSKU)
          .withPrice(product.productPrice)
          .withID(product.productID)
          .withAmount(product.productQuantity)
          .build();
      }
    );
    return tempProd[0];
  }

  getMaterialFromJson(materialObject: Material[]) {
    return materialObject.map(
      (mat) => {
        return new MaterialBuilder()
          .withName(mat.materialName)
          .build()
      }
    );
  }

  updateQuantity(form: FormGroup) {
    this.webService.updateQuantity(form)
      .subscribe(
        (data: Data) => {
          console.log(data);
        }
      )
  }

  deleteProduct(id: string) {
    this.webService.deleteProduct(id)
      .subscribe(
        (data: Data) => {
          console.log(data);
          this.deleteEmitter.emit();
        },
        (error: Data) => {
          console.log(error);
        }
      );
  }

}
