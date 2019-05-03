import {Injectable} from '@angular/core';
import {Product} from '../../shared/views/product';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {forkJoin, Observable} from 'rxjs';
import {ProductService} from '../product-service';
import {WebService} from '../../shared/web/web.service';

@Injectable()
export class ProductResolver implements Resolve<Product>{

  constructor(private webService: WebService) {

  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> | Promise<any> | Product {
    console.log('is resolved');
    let id = +route.params['id'];
    let productResponse = this.webService.getProductsByQuery(`?$filter=productID eq ${id}`);
    let materialResponse = this.webService.getProductMaterials(id)
    return forkJoin(productResponse, materialResponse);
  }

}
