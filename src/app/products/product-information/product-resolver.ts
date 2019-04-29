import {Injectable} from '@angular/core';
import {Product} from '../../shared/views/product';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ProductInformationComponent} from './product-information.component';
import {ProductService} from '../product-list/product-service';

@Injectable()
export class ProductResolver implements Resolve<Product>{

  constructor(private productService: ProductService) {

  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Product> | Promise<Product> | Product {

    return this.productService.getProduct(+route.params['id']);
  }

}
