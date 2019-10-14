import { Product } from './product.model';

export class CartProduct {
  public id: number;
  public product: Product;
  public qty: number = 0;
}
