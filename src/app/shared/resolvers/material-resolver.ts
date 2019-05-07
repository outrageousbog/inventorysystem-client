import {Injectable} from '@angular/core';
import {Material} from '../views/material';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {WebService} from '../web/web.service';
import {Observable} from 'rxjs';

@Injectable()
export class MaterialResolver implements Resolve<Material[]>{

  constructor(private webService: WebService) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> | Promise<any> | Material[] {
    let id = +route.params['id'];
    return this.webService.getProductMaterials(id);
  }

}
