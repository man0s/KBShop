import {User} from './user.model';
import {Cart} from './cart.model';

export class Order {
  timestamp: string;
  user: User;
  cart: Cart;
}
