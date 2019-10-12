import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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

@NgModule({
  declarations: [
    EShopComponent,
    NavbarComponent,
    ProductsComponent,
    ProductComponent,
    FooterComponent,
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
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
