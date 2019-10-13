import { Component, OnInit, OnDestroy  } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Cart} from '../../../models/cart.model';
import {Product} from '../../../models/product.model';
import {ProductService} from '../../../services/product.service';
import {CartService} from '../../../services/cart.service';
import {CartProduct} from '../../../models/cart-product.model';
import {LocalStorageService} from '../../../services/storage.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public cart: Observable<Cart>;
  public cartItems: CartProduct[];
  public itemCount: number;

  private products: Product[];
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
    this.cart = this.cartService.get();
    this.cartSubscription = this.cart.subscribe((cart) => {
      this.itemCount = cart.items.map((x) => x.qty).reduce((p, n) => p + n, 0);
      this.productService.all().subscribe((products) => {
        this.products = products;
        this.cartItems = cart.items
          .map((item) => {
            const product = this.products.find((p) => p.id === item.id);
            return {
              ...item,
              product,
              totalCost: product.price * item.qty };
          });
      });
    });
  }

  public ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
