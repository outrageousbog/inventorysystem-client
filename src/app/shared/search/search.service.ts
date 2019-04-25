import {Injectable, OnInit} from '@angular/core';
import {WebService} from '../web/web.service';
import {SearchTypes} from './search-types';
import {Brand, BrandBuilder} from '../views/brand';
import {Product, ProductBuilder} from '../views/product';
import {Subject} from 'rxjs';
import {Data} from '@angular/router';

@Injectable()
export class SearchService {
  productsSearchObs = new Subject();
  brandsSearchObs = new Subject();

  constructor(private webService: WebService) {}

  search(type: SearchTypes, query: string) {
    if (type == SearchTypes.Product) {
      this.searchProducts(query);
    }
    if (type == SearchTypes.Brand) {
      this.searchBrands(query);
    }
  }

  private searchProducts(query: string) {
    let productsArray: Product[];
    this.webService.getProductsByQuery(query)
      .subscribe((data: Product[]) => {
          productsArray = data.map(
            (product) => {
              return new ProductBuilder()
                .withID(product.productID)
                .withName(product.productName)
                .withPrice(product.productPrice)
                .withSKU(product.productSKU)
                .withVariableCosts(product.productVariableCost)
                .withBrand(product.productBrand)
                .build();
            }
          );
          this.productsSearchObs.next(productsArray)
        },
        (error: Data) => {
          console.log(error);
        });
  }

  private searchBrands(query: string) {
    let brandsArray: Brand[];
    this.webService.getBrandsByQuery(query)
      .subscribe(
        (data: Brand[]) => {
          brandsArray = data.map(
            (brand) => {
              return new BrandBuilder()
                .withID(brand.brandID)
                .withName(brand.brandName)
                .build();
            }
          );
          this.brandsSearchObs.next(brandsArray);
        },
        (error: Data) => {
          console.log(error);
        }
      )
  }
}
