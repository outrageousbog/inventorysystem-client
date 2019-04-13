import {RouterModule, Routes} from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {MainPageComponent} from './main-page/main-page.component';
import {BrandsComponent} from './brands/brands.component';

const appRoutes: Routes = [
  {path: '', component: LoginComponent, pathMatch:'full'},
  {path: 'products', component: ProductsComponent},
  {path: 'frontpage', component: MainPageComponent},
  {path: 'brands', component: BrandsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModules {
}
