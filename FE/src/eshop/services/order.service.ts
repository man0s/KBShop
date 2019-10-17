import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Order } from '../models/order.model';

const API_ENDPOINT = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orders: Observable<Order[]>;

  constructor(private http: HttpClient) {
  }


  public getOrders(): Observable<Order[]> {
    return this.http.get(API_ENDPOINT + "/getOrders")
      .pipe(map((response: any) => response)
      );
  }

  public createOrder(order: Order) {
    this.http.post(API_ENDPOINT + "/createOrder", order)
      .subscribe(
        result => console.log("Order from user(" + order.user.email + ") has been created!"),
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
