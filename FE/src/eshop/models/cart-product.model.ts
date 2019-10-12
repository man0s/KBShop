import { Product } from './product.model';

export class CartProduct {
  public id: string;
  public product: Product;
  public qty: number = 0;
}
