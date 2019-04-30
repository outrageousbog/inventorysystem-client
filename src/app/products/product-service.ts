import {Injectable} from '@angular/core';
import {ProductSearchBuilder} from '../shared/search/products/product.search';
import {WebService} from '../shared/web/web.service';
import {Subject} from 'rxjs';
import {Product, ProductBuilder} from '../shared/views/product';
import {Data} from '@angular/router';

@Injectable()
export class ProductService {
  productsSearchObs = new Subject();
  private product = new Product();
  private productsArray: Product[] = [];
  private productSearchBuilder = new ProductSearchBuilder();

  constructor(private webService: WebService) {}

  private searchProducts(query: string) {
    this.webService.getProductsByQuery(query)
      .subscribe((data: Product[]) => {
          this.productsArray = data.map(
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
          this.productsSearchObs.next(this.productsArray)
        },
        (error: Data) => {
          console.log(error);
        });
  }

  getProductsArray() {
    return this.productsArray.slice();
  }

  search(searchValue: string) {
    if (searchValue != null) {
      this.productSearchBuilder.withContains('productName', searchValue)
    }
    let searchQuery = this.productSearchBuilder.build();
    this.searchProducts(searchQuery.query);
  }

  getProductFromJson(productObject: Product[]) {
    let tempProd: Product[] = productObject.map(
      (prod) => {
        return new ProductBuilder()
          .withVariableCosts(prod.productVariableCost)
          .withBrand(prod.productBrand)
          .withName(prod.productName)
          .withSKU(prod.productSKU)
          .withPrice(prod.productPrice)
          .withID(prod.productID)
          .build();
      }
    );
    return tempProd[0];
  }
}
