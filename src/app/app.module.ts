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
  ],
  imports: [
    BrowserModule,
    AppRoutingModules,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    AppRoutingModules,
    WebService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
