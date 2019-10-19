import {User} from './user.model';
import {CartProduct} from './cart-product.model';

export class Order {
  id: number;
  user: User;
  orderProducts: CartProduct[];
  name: string;
  surname: string;
  address: string;
  phone: string;
  price_total: number;
  products_total: number;
  posted: boolean;
}
