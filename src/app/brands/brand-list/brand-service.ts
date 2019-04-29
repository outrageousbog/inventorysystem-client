import {Injectable} from '@angular/core';
import {Brand, BrandBuilder} from '../../shared/views/brand';
import {Subject} from 'rxjs';
import {BrandSearchBuilder} from '../../shared/search/brands/brand.search';
import {WebService} from '../../shared/web/web.service';
import {Data} from '@angular/router';

@Injectable()
export class BrandService {
  brandsSearchObs = new Subject();
  private brandList: Brand[] = [];
  private brandSearchBuilder = new BrandSearchBuilder();

  constructor(private webService: WebService) {}


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
    )
  }

  search(searchValue: string){
    if (searchValue != null){
      this.brandSearchBuilder.withContains('brandName', searchValue);
    }
    let searchQuery = this.brandSearchBuilder.build();
    console.log(this.brandSearchBuilder.build());
    this.searchBrands(searchQuery.query);
  }

}
