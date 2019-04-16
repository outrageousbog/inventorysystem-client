import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';
import {AppRoutingModules} from './app-routing.modules';
import {DropdownDirective} from './shared/dropdown.directive';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {WebService} from './shared/web.service';
import { LoginComponent } from './login/login.component';
import { BrandsComponent } from './brands/brands.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    HeaderComponent,
    ProductsComponent,
    DropdownDirective,
    LoginComponent,
    BrandsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModules,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AppRoutingModules,
    WebService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
