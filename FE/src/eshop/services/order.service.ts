import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Order } from '../models/order.model';
import { Form } from '@angular/forms';
import {JsonFormatter} from 'tslint/lib/formatters';
import {User} from '../models/user.model';

const API_ENDPOINT = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orders: Observable<Order[]>;

  constructor(private http: HttpClient) {
  }


  public getAllOrders(): Observable<Order[]> {
    return this.http.get(API_ENDPOINT + "/getOrders")
      .pipe(map((response: any) => response)
      );
  }

  public getOrders(userEmail: string): Observable<Order[]> {
    return this.http.get(API_ENDPOINT + "/getOrders/" + userEmail)
      .pipe(map((response: any) => response)
      );
  }

  public createOrder(customerData) {
    let order = new Order;
    order.user = customerData.user;
    order.name = customerData.name;
    order.surname = customerData.surname;
    order.address = customerData.address;
    order.phone = customerData.phone;
    order.products_total = customerData.cart.itemsTotal;
      order.price_total = customerData.cart.priceTotal;
      customerData.cart.items.forEach(cartProduct => cartProduct.id = undefined);
      order.orderProducts = customerData.cart.items;
      order.posted = false;
      this.http.post(API_ENDPOINT + "/createOrder", order)
        .subscribe(
          result => console.log("Order from user(" + customerData.email + ") has been created!"),
          err => console.error(err)
        );
  }

  public editOrder(order: Order) {
    this.http.put(API_ENDPOINT + "/editOrder", order)
      .subscribe(
        result => console.log("Order from user(" + order.user.email + ") has been edited!"),
        err => console.error(err)
      );
  }

  public deleteOrder(orderID: number){
    this.http.delete(API_ENDPOINT + "/deleteOrder/" + orderID)
      .subscribe(
        result => console.log("Order with id(" + orderID + ") has been deleted!"),
        err => console.error(err)
      );
  }
}
