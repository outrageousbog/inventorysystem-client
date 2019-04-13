import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from './views/product';
import {UserService} from './user.service';
import {Brand} from './views/brand';

@Injectable()
export class WebService {
  private configURL = "https://localhost:5001/api/"

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>(this.configURL + 'productList');
  }

  validateUser(user: UserService) {
    return this.http.post(this.configURL + 'session', user);
  }

  getBrands() {
    return this.http.get<Brand[]>(this.configURL + 'brands');
  }

  getBrandsByName(name: string) {
    return this.http.get<Brand[]>(this.configURL + 'search/brand/' + name);
  }
}
