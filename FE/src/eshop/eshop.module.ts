import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { EShopComponent } from './eshop.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './products/product/product.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    EShopComponent,
    NavbarComponent,
    ProductsComponent,
    ProductComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [EShopComponent]
})
export class EShopModule { }
