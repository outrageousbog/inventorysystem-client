import {Injectable} from '@angular/core';
import {Product} from '../../shared/views/product';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ProductService} from '../product-service';
import {WebService} from '../../shared/web/web.service';

@Injectable()
export class ProductResolver implements Resolve<Product>{

  constructor(private webService: WebService) {

  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> | Promise<any> | Product {
    console.log('is resolved');
    return this.webService.getProductsByQuery(`?$filter=productID eq ${+route.params['id']}`);
  }

}
