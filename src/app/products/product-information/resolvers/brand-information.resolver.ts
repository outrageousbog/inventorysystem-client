import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Product} from '../../../shared/views/product';
import {Observable} from 'rxjs';
import {WebService} from '../../../shared/web/web.service';

@Injectable()
export class BrandInformationResolver implements Resolve<Product[]>{

  constructor(private webService: WebService) {}


  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> | Promise<any> | Product[] {

    let id = String(route.params['id']);


    return this.webService.getProductsByQuery(`?$Filter=productBrand eq '${id.toUpperCase()}'`);
  }

}
