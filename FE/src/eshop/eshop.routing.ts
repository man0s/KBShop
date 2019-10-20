import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {CheckoutComponent} from './components/products/checkout/checkout.component';
import {ProductsComponent} from './components/products/products.component';
import {ProductsManagementComponent} from './components/management/products-management/products-management.component';
import {UsersManagementComponent} from './components/management/users-management/users-management.component';
import {OrderHistoryComponent} from './components/navbar/order-history/order-history.component';
import {OrdersManagementComponent} from './components/management/orders-management/orders-management.component';

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
      },
      {
        component: OrdersManagementComponent,
        path: 'management/orders'
      },
      {
        component: OrderHistoryComponent,
        path: 'user/orders'
      }
    ])
  ]
})
export class AppRoutingModule { }
