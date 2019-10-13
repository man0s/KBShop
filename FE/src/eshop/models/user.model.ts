import {Order} from './order.model';

export class User {
  id: string;
  email: string;
  orders: Order[];
}
