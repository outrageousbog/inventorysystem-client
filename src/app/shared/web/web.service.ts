import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Product} from '../views/product';
import {UserService} from '../views/user.service';
import {Brand} from '../views/brand';
import {Data} from '@angular/router';

@Injectable()
export class WebService {
  private configURL = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) {
  }

  getProducts() {
    return this.http.get<Product[]>(this.configURL + 'products');
  }

  validateUser(user: UserService) {
    return this.http.post(this.configURL + 'session', user);
  }

  getBrands() {
    return this.http.get<Brand[]>(this.configURL + 'brands');
  }

  getBrandsByQuery(query: string) {
    console.log(this.configURL + 'product/' + query);
    return this.http.get<Brand[]>(this.configURL + 'product/' + query);
  }

  getProductsByQuery(query: string) {
    console.log(this.configURL + 'product/' + query);
    return this.http.get<Product[]>(this.configURL + 'product/' + query);
  }

  getProduct(query: string) {
    console.log(this.configURL + 'product/' + query);
    return this.http.get<Product>(this.configURL + 'product/' + query);
  }

  deleteProduct(id: any) {
    return this.http.delete(this.configURL + 'product/' + id);
  }
}
