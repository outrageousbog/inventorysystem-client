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
import {TokenInterceptor} from './shared/authentication/interceptor/token-interceptor';
import {AuthService} from './shared/authentication/auth.service';
import { ProductInformationComponent } from './products/product-information/product-information.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import {AuthGuard} from './shared/authentication/auth-guard.service';
import { CreateBrandComponent } from './brands/create-brand/create-brand.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { BrandListComponent } from './brands/brand-list/brand-list.component';
import {ProductService} from './products/product-service';
import {BrandService} from './brands/brand-list/brand-service';
import { ErrorPageComponent } from './error-page/error-page.component';
import {ProductResolver} from './products/product-information/product-resolver';
import {NgHttpLoaderModule} from 'ng-http-loader';

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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
