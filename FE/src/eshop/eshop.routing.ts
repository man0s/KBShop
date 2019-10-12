import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {EShopComponent} from './eshop.component';
import {CheckoutComponent} from './components/products/checkout/checkout.component';
import {ProductsComponent} from './components/products/products.component';

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
      }])
  ]
})
export class AppRoutingModule { }
