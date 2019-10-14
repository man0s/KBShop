import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Observable<Product[]>;

  constructor(private http: HttpClient) {
  }


  public getProducts(): Observable<Product[]> {
    return this.http.get("http://localhost:8080/api/getProducts")
      .pipe(map((response: any) => response)
      );
  }

  public createProduct(product: Product) {
    this.http.post("http://localhost:8080/api/createProduct", product)
      .subscribe(
        result => console.log("Product with title(" + product.title + ") has been created!"),
        err => console.error(err)
      );
  }

  public editProduct(product: Product){
    this.http.put("http://localhost:8080/api/editProduct", product)
      .subscribe(
        result => console.log("Product with id(" + product.id + ") has been updated!"),
        err => console.error(err)
      );
  }

  public deleteProduct(productID: number){
    this.http.delete("http://localhost:8080/api/deleteProduct/" + productID)
      .subscribe(
        result => console.log("Product with id(" + productID + ") has been deleted!"),
        err => console.error(err)
      );
  }


}
