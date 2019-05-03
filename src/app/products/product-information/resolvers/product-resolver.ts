import {Injectable} from '@angular/core';
import {Product} from '../../../shared/views/product';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {WebService} from '../../../shared/web/web.service';
import {Observable} from 'rxjs';

@Injectable()
export class ProductResolver implements Resolve<Product>{

  constructor(private webService: WebService) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> | Promise<any> | Product {
    console.log('is resolved');
    let id = +route.params['id'];
    return this.webService.getProductsByQuery(`?$filter=productID eq ${id}`);
  }

}
