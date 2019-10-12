import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {EShopComponent} from './eshop.component';

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot([
      {
        component: EShopComponent,
        path: '**'
      }])
  ]
})
export class AppRoutingModule { }
