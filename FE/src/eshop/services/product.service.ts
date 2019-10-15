import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

const API_ENDPOINT = "http://localhost:8080/api";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Observable<Product[]>;

  constructor(private http: HttpClient) {
  }


  public getProducts(): Observable<Product[]> {
    return this.http.get(API_ENDPOINT + "/getProducts")
      .pipe(map((response: any) => response)
      );
  }

  public createProduct(product: Product) {
    this.http.post(API_ENDPOINT + "/createProduct", product)
      .subscribe(
        result => console.log("Product with title(" + product.title + ") has been created!"),
        err => console.error(err)
      );
  }

  public editProduct(product: Product){
    this.http.put(API_ENDPOINT + "/editProduct", product)
      .subscribe(
        result => console.log("Product with id(" + product.id + ") has been updated!"),
        err => console.error(err)
      );
  }

  public deleteProduct(productID: number){
    this.http.delete(API_ENDPOINT + "/deleteProduct/" + productID)
      .subscribe(
        result => console.log("Product with id(" + productID + ") has been deleted!"),
        err => console.error(err)
      );
  }


}
