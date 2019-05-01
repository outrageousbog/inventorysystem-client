import {RouterModule, Routes} from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {MainPageComponent} from './main-page/main-page.component';
import {BrandsComponent} from './brands/brands.component';
import {ProductInformationComponent} from './products/product-information/product-information.component';
import {CreateProductComponent} from './products/create-product/create-product.component';
import {AuthGuard} from './shared/authentication/auth-guard.service';
import {CreateBrandComponent} from './brands/create-brand/create-brand.component';
import {FrontPageComponent} from './front-page/front-page.component';
import {ProductListComponent} from './products/product-list/product-list.component';
import {BrandListComponent} from './brands/brand-list/brand-list.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import {ProductResolver} from './products/product-information/product-resolver';
import {CreateMaterialComponent} from './materials/create-material/create-material.component';

const appRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'main',
    component: FrontPageComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {path: '', component: MainPageComponent},
      {
        path: 'products',
        component: ProductsComponent,
        children: [
          {path: '', pathMatch: 'full', component: ProductListComponent},
          {path: 'create', component: CreateProductComponent},
          {path: ':id', component: ProductInformationComponent,resolve: {product: ProductResolver}},
          {path: '**', component: ErrorPageComponent},
        ]
      },
      {
        path: 'brands',
        component: BrandsComponent,
        children: [
          {path: '', pathMatch: 'full', component: BrandListComponent},
          {path: 'create', component: CreateBrandComponent},
          {path: '**', component: ErrorPageComponent},
        ]
      },
      {path: 'materials/create', component: CreateMaterialComponent},
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: '**', canActivate: [AuthGuard], component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModules {
}
