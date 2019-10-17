import {User} from './user.model';
import {CartProduct} from './cart-product.model';

export class Order {
  id: number;
  user: User;
  products: CartProduct[];
  price_total: number;
  products_total: number;
}
