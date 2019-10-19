import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform } from '@angular/core';

import { EShopComponent } from './eshop.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './components/products/product/product.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartComponent } from './components/products/cart/cart.component';
import {AppRoutingModule} from './eshop.routing';
import {ProductService} from './services/product.service';
import { HttpClientModule } from '@angular/common/http';
import {LocalStorageService, StorageService} from './services/storage.service';
import {CartService} from './services/cart.service';
import { CheckoutComponent } from './components/products/checkout/checkout.component';
import { ProductsManagementComponent } from './components/management/products-management/products-management.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UsersManagementComponent } from './components/management/users-management/users-management.component';
import { OrderComponent } from './components/products/order/order.component';
import { OrderHistoryComponent } from './components/navbar/order-history/order-history.component';
import { OrdersManagementComponent } from './components/management/orders-management/orders-management.component';
import {SortPipe} from './pipes/sort.pipe';

@NgModule({
  declarations: [
    EShopComponent,
    NavbarComponent,
    ProductsComponent,
    ProductComponent,
    FooterComponent,
    CartComponent,
    CheckoutComponent,
    ProductsManagementComponent,
    UsersManagementComponent,
    OrderComponent,
    OrderHistoryComponent,
    OrdersManagementComponent,
    SortPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    LocalStorageService,
    { provide: StorageService, useClass: LocalStorageService },
    {
      deps: [StorageService, ProductService],
      provide: CartService,
      useClass: CartService
    }
  ],
  bootstrap: [EShopComponent]
})
export class EShopModule { }
