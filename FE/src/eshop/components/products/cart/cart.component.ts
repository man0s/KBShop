import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription, Observable} from 'rxjs';
import {Product} from '../../../models/product.model';
import {ProductService} from '../../../services/product.service';
import {CartService} from '../../../services/cart.service';
import {ActivatedRoute} from '@angular/router';
import { Cart } from 'src/eshop/models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  public products: Observable<Product[]>;
  public cart: Observable<Cart>;
  public itemCount: number;

  private cartSubscription: Subscription;

  public constructor(private productService: ProductService,
                     private cartService: CartService) {
  }

  public emptyCart(): void {
    this.cartService.empty();
  }

  public removeProduct(product: Product): void {
    this.cartService.removeItem(product);
  }

  public ngOnInit(): void {
    this.products = this.productService.all();
    this.cart = this.cartService.get();
    this.cartSubscription = this.cart.subscribe((cart) => {
      this.itemCount = cart.items.map((x) => x.qty).reduce((p, n) => p + n, 0);
    });
  }

  public ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
