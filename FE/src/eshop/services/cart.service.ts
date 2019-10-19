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

  public constructor(private storageService: StorageService, private productService: ProductService)
  {
    //get current local storage
    this.storage = this.storageService.get();
    //get products and subscribe
    this.productService.getProducts().subscribe((products) => this.products = products);

    this.subscriptionObservable = new Observable<Cart>((observer: Observer<Cart>) => {
      this.subscribers.push(observer);
      observer.next(this.retrieveCart());
      return () => this.subscribers = this.subscribers.filter((obs) => obs !== observer);
    });
  }

  public getCart(): Observable<Cart> {
    return this.subscriptionObservable;
  }


  public addItem(product: Product, quantity: number): void {
    const cart = this.retrieveCart();
    let item = cart.items.find((p) => p.id === product.id);
    //if item does not exist in cart, create it baby!
    if (item === undefined) {
      item = new CartProduct();
      item.id = product.id;
      item.product = product;
      cart.items.push(item);
    }

    item.quantity += quantity;
    //filter the items, for quantity > 0
    cart.items = cart.items.filter((cartItem) => cartItem.quantity > 0);

    //calculate the cart
    this.calculateCart(cart);
    //save the cart to local storage
    this.storage.setItem('cart', JSON.stringify(cart));
    //all the subs will get the update, even if one fails
    this.subscribers
      .forEach((sub) => {
        try {
          sub.next(cart);
        } catch (e) { }
      });
  }

  public removeItem(product: Product): void {
    const cart = this.retrieveCart();
    //remove product from cart
    cart.items.splice(cart.items.findIndex((p) => p.id === product.id), 1);
    //calculate the cart
    this.calculateCart(cart);
    // save the cart to local storage
    this.storage.setItem('cart', JSON.stringify(cart));
    //all the subs will get the update, even if one fails
    this.subscribers
      .forEach((sub) => {
        try {
          sub.next(cart);
        } catch (e) { }
      });
  }

  public empty(): void {
    //delete the cart from local storage
    localStorage.removeItem('cart');
    const newCart = new Cart();
    //save the new cart in local storage
    this.storage.setItem('cart', JSON.stringify(newCart));
    //all the subs will get the update, even if one fails
    this.subscribers
      .forEach((sub) => {
        try {
          sub.next(newCart);
        } catch (e) { }
      });
  }

  public calculateCart(cart: Cart): void {
    //calculate the current priceTotal
    cart.priceTotal = cart.items
      .map((item) => item.quantity * item.product.price)
      .reduce((previous, current) => previous + current, 0);
    //calculate the current itemsTotal
    cart.itemsTotal = cart.items
      .map((item) => item.quantity)
      .reduce((previous, current) => previous + current, 0);
  }

  public retrieveCart(): Cart {
    const cart = new Cart();
    const storedCart = this.storage.getItem('cart');
    //update the cart from local storage
    if (storedCart) cart.updateFrom(JSON.parse(storedCart));
    return cart;
  }
}
