import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {BrandSearchBuilder} from '../shared/search/brands/brand.search';
import {WebService} from '../shared/web/web.service';
import {Data} from '@angular/router';
import {Brand, BrandBuilder} from '../shared/views/brand';
import {Product, ProductBuilder} from '../shared/views/product';

@Injectable()
export class BrandService {
  brandsSearchObs = new Subject();
  brandsDeleteSub = new Subject();
  private brandList: Brand[] = [];
  private brandSearchBuilder = new BrandSearchBuilder();

  constructor(private webService: WebService) {
  }


  getBrandsList() {
    return this.brandList.slice();
  }

  private searchBrands(query: string) {
    this.webService.getBrandsByQuery(query)
      .subscribe(
        (data: Brand[]) => {
          this.brandList = data.map(
            (brand) => {
              return new BrandBuilder()
                .withID(brand.brandID)
                .withName(brand.brandName)
                .build();
            }
          );
          this.brandsSearchObs.next(this.brandList);
        },
        (error: Data) => {
          console.log(error);
        }
      );
  }

  search(searchValue: string) {
    if (searchValue != null) {
      this.brandSearchBuilder.withContains('brandName', searchValue);
    }
    let searchQuery = this.brandSearchBuilder.build();
    console.log(this.brandSearchBuilder.build());
    this.searchBrands(searchQuery.query);
  }

  getProductsFromJson(productObject: any): Product[] {
    let tempProducts: Product[] = productObject.map(
      (product) => {
        return new ProductBuilder()
          .withName(product.productName)
          .withID(product.productID)
          .withPrice(product.productPrice)
          .withAmount(product.productQuantity)
          .build();
      }
    );
    return tempProducts;
  }

  deleteBrand(brandID: string) {
    this.webService.deleteBrand(brandID)
      .subscribe(
        () => {
          this.brandsDeleteSub.next();
          const query = new BrandSearchBuilder().build().query;
          this.searchBrands(query);
        }
      );
  }

  getBrandFromJson(brandObject: any) {
    let tempBrand: Brand[] = brandObject.map(
      (brand) => {
        return new BrandBuilder()
          .withName(brand.brandName)
          .withID(brand.brandID)
          .build()
      }
    );
    return tempBrand[0];
  }
}
