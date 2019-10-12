import { CartProduct } from './cart-product.model';

export class Cart {
  public items: CartProduct[] = new Array<CartProduct>();
  public priceTotal = 0;
  public itemsTotal = 0;

  public updateFrom(cart: Cart) {
    this.items = cart.items;
    this.priceTotal = cart.priceTotal;
    this.itemsTotal = cart.itemsTotal;
  }
}
