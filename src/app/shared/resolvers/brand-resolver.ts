import {Brand} from '../views/brand';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {WebService} from '../web/web.service';
import {BrandSearchBuilder} from '../search/brands/brand.search';

@Injectable()
export class BrandResolver implements Resolve<Brand>{

  constructor(private webService: WebService) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> | Promise<any> | Brand {
    const name: string = route.params['id'];
    return this.webService.getBrandsByQuery(`brands/?$filter=contains(brandname, '${name.toUpperCase()}')`);
  }

}
