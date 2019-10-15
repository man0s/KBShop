import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {EShopComponent} from './eshop.component';
import {CheckoutComponent} from './components/products/checkout/checkout.component';
import {ProductsComponent} from './components/products/products.component';
import {ProductsManagementComponent} from './components/management/products-management/products-management.component';
import {UsersManagementComponent} from './components/management/users-management/users-management.component';

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: ProductsComponent
      },
      {
        component: CheckoutComponent,
        path: 'checkout'
      },
      {
        component: ProductsManagementComponent,
        path: 'management/products'
      },
      {
        component: UsersManagementComponent,
        path: 'management/users'
      }
    ])
  ]
})
export class AppRoutingModule { }
