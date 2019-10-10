import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { EShopComponent } from './eshop.component';

@NgModule({
  declarations: [
    EShopComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [EShopComponent]
})
export class EShopModule { }
