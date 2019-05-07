import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';
import {AppRoutingModules} from './app-routing.modules';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {WebService} from './shared/web/web.service';
import { LoginComponent } from './login/login.component';
import { BrandsComponent } from './brands/brands.component';
import {CustomHttpInterceptor} from './shared/authentication/interceptor/custom-http-interceptor.service';
import {AuthService} from './shared/authentication/auth.service';
import { ProductInformationComponent } from './products/product-information/product-information.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import {AuthGuard} from './shared/authentication/auth-guard.service';
import { CreateBrandComponent } from './brands/create-brand/create-brand.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { BrandListComponent } from './brands/brand-list/brand-list.component';
import {ProductService} from './products/product-service';
import { ErrorPageComponent } from './error-page/error-page.component';
import {NgHttpLoaderModule} from 'ng-http-loader';
import { CreateMaterialComponent } from './materials/create-material/create-material.component';
import { MaterialsComponent } from './materials/materials.component';
import { MaterialsListComponent } from './materials/materials-list/materials-list.component';
import {MaterialService} from './materials/material.service';
import { BrandInformationComponent } from './brands/brand-information/brand-information.component';
import {BrandService} from './brands/brand-service';
import {ProductResolver} from './shared/resolvers/product-resolver';
import {MaterialResolver} from './shared/resolvers/material-resolver';
import {BrandInformationResolver} from './shared/resolvers/brand-information.resolver';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    HeaderComponent,
    ProductsComponent,
    LoginComponent,
    BrandsComponent,
    ProductInformationComponent,
    CreateProductComponent,
    CreateBrandComponent,
    FrontPageComponent,
    ProductListComponent,
    BrandListComponent,
    ErrorPageComponent,
    CreateMaterialComponent,
    MaterialsComponent,
    MaterialsListComponent,
    BrandInformationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModules,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgHttpLoaderModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuard,
    AppRoutingModules,
    WebService,
    ProductService,
    BrandService,
    ProductResolver,
    MaterialResolver,
    MaterialService,
    BrandInformationResolver,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
