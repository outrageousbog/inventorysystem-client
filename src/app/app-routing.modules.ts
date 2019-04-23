import {RouterModule, Routes} from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {MainPageComponent} from './main-page/main-page.component';
import {BrandsComponent} from './brands/brands.component';
import {ProductInformationComponent} from './products/product-information/product-information.component';
import {CreateProductComponent} from './products/create-product/create-product.component';
import {AuthGuard} from './shared/authentication/auth-guard.service';

const appRoutes: Routes = [
  {path: '', component: LoginComponent, pathMatch:'full'},
  {path: 'products', canActivate: [AuthGuard], component: ProductsComponent},
  {path: 'frontpage', canActivate: [AuthGuard], component: MainPageComponent},
  {path: 'brands', canActivate: [AuthGuard],component: BrandsComponent},
  {path: 'products/:id', pathMatch: 'full', component: ProductInformationComponent},
  {path: 'products/create', component: CreateProductComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', canActivate: [AuthGuard], component: MainPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModules {
}
