import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { CartProduct } from '../models/cart-product.model';
import { Product } from '../models/product.model';
import { Cart } from '../models/cart.model';
import { ProductService } from './product.service';
import { Observable, Observer } from 'rxjs';

@Injectable()
export class CartService {
  private storage: Storage;
  private subscriptionObservable: Observable<Cart>;
  private subscribers: Array<Observer<Cart>> = new Array<Observer<Cart>>();
  private products: Product[];

  public constructor(private storageService: StorageService,
                     private productService: ProductService) {
    this.storage = this.storageService.get();
    this.productService.getProducts().subscribe((products) => this.products = products);

    this.subscriptionObservable = new Observable<Cart>((observer: Observer<Cart>) => {
      this.subscribers.push(observer);
      observer.next(this.retrieve());
      return () => {
        this.subscribers = this.subscribers.filter((obs) => obs !== observer);
      };
    });
  }

  public getCart(): Observable<Cart> {
    return this.subscriptionObservable;
  }


  public addItem(product: Product, quantity: number): void {
    const cart = this.retrieve();
    let item = cart.items.find((p) => p.id === product.id);
    if (item === undefined) {
      item = new CartProduct();
      item.id = product.id;
      item.product = product;
      cart.items.push(item);
    }

    item.quantity += quantity;
    cart.items = cart.items.filter((cartItem) => cartItem.quantity > 0);

    this.calculateCart(cart);
    this.save(cart);
    this.dispatch(cart);
  }

  public removeItem(product: Product): void {
    const cart = this.retrieve();
    cart.items.splice(cart.items.findIndex((p) => p.id === product.id), 1);

    this.calculateCart(cart);
    this.save(cart);
    this.dispatch(cart);
  }

  public empty(): void {
    localStorage.removeItem('cart');
    const newCart = new Cart();
    this.save(newCart);
    this.dispatch(newCart);
  }

  public calculateCart(cart: Cart): void {
    cart.priceTotal = cart.items
      .map((item) => item.quantity * item.product.price)
      .reduce((previous, current) => previous + current, 0);

    cart.itemsTotal = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
  }

  public retrieve(): Cart {
    const cart = new Cart();
    const storedCart = this.storage.getItem('cart');
    if (storedCart) {
      cart.updateFrom(JSON.parse(storedCart));
    }

    return cart;
  }

  private save(cart: Cart): void {
    this.storage.setItem('cart', JSON.stringify(cart));
  }

  private dispatch(cart: Cart): void {
    this.subscribers
      .forEach((sub) => {
        try {
          sub.next(cart);
        } catch (e) {
          // we want all subscribers to get the update even if one errors.
        }
      });
  }
}
