import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Product} from '../views/product';
import {UserService} from '../views/user.service';
import {Brand} from '../views/brand';
import {Material} from '../views/material';
import {FormGroup} from '@angular/forms';
import {retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
  }
)
export class WebService {
  // private configURL = 'http://localhost:5000/api/';
  //private configURL = 'http://ec2-13-53-207-45.eu-north-1.compute.amazonaws.com:7119/api/';
  private configURL = 'http://dist.saluton.dk:7119/api/';

  constructor(private http: HttpClient) {
  }

  getProducts() {
    return this.http.get<Product[]>(this.configURL + 'products');
  }

  validateUser(user: UserService) {
    return this.http.post(this.configURL + 'session', user);
  }

  getBrands() {
    return this.http.get<Brand[]>(this.configURL + 'product/brands?$orderby=brandname');
  }

  getBrandsByQuery(query: string) {
    console.log(this.configURL + 'product/' + query);
    return this.http.get<Brand[]>(this.configURL + 'product/' + query);
  }

  getMaterials() {
    return this.http.get<Material[]>(this.configURL + 'material?$orderby=materialname');
  }

  getProductsByQuery(query: string) {
    console.log(this.configURL + 'product/' + query);
    return this.http.get<Product[]>(this.configURL + 'product/' + query);
  }

  getMaterialsByQuery(query: string) {
    return this.http.get<Material[]>(this.configURL + 'material/' + query);
  }

  getProduct(query: string) {
    console.log(this.configURL + 'product/' + query);
    return this.http.get<Product>(this.configURL + 'product/' + query);
  }

  getProductMaterials(id: number) {
    return this.http.get<Material>(this.configURL + 'material/materialsorders/' + id);
  }

  deleteProduct(id: any) {
    return this.http.delete(this.configURL + 'product/' + id);
  }

  deleteBrand(brandID: any) {
    return this.http.delete(this.configURL + 'product/brands/', brandID);
  }

  createBrand(brand: any) {
    return this.http.post(this.configURL + 'product/brands', brand);
  }

  createProduct(brand: FormGroup) {
    return this.http.post(this.configURL + 'product', brand);
  }

  createMaterial(material: FormGroup) {
    return this.http.post(this.configURL + 'material', material);
  }

  updateQuantity(form: any) {
    return this.http.put(this.configURL + 'product/quantities', form);
  }

  updateProduct(form: any) {
    return this.http.put(this.configURL + 'product', form);
  }
}
