import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import {Observable, Observer} from 'rxjs';
import { CartService } from 'src/eshop/services/cart.service';

@Component({
  selector: '[app-product]',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;

  constructor(private cartService: CartService) { }

  public addProductToCart(product: Product): void {
    this.cartService.addItem(product, 1);
  }

  public removeProductFromCart(product: Product): void {
    this.cartService.addItem(product, -1);
  }

  public productInCart(product: Product): boolean {
    return Observable.create((obs: Observer<boolean>) => {
      const sub = this.cartService
        .getCart()
        .subscribe((cart) => {
          obs.next(cart.items.some((i) => i.id === product.id));
          obs.complete();
        });
      sub.unsubscribe();
    });
  }

  ngOnInit() {
  }

}
