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
    return this.http.get<Order[]>(API_ENDPOINT + "/getOrders/" + userEmail)
      .pipe(map((response: any) => response)
      );
  }

  public createOrder(customerData) {
    let order = new Order;
    order.user = customerData.user;
    order.name = customerData.name;
    order.surname = customerData.surname;
    order.address = customerData.address;
    order.products_total = JSON.parse(customerData.cart.itemsTotal);
    order.price_total = customerData.cart.priceTotal;
    order.orderProducts = customerData.cart.items;
    order.posted = customerData.posted;
    console.log(JSON.stringify(order));
    this.http.post(API_ENDPOINT + "/createOrder", order)
      .subscribe(
        result => console.log("Order from user with email(" + customerData.email + ") has been created!"),
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
  //
  // public editProduct(product: Product){
  //   this.http.put(API_ENDPOINT + "/editProduct", product)
  //     .subscribe(
  //       result => console.log("Product with id(" + product.id + ") has been updated!"),
  //       err => console.error(err)
  //     );
  // }
  //
  // public deleteProduct(productID: number){
  //   this.http.delete(API_ENDPOINT + "/deleteProduct/" + productID)
  //     .subscribe(
  //       result => console.log("Product with id(" + productID + ") has been deleted!"),
  //       err => console.error(err)
  //     );
  // }


}
