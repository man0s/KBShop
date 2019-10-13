import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService{

  private products: Observable<Product[]>;

  constructor(private http: HttpClient) {
  }


  public all(): Observable<Product[]> {
    return this.http.get("./assets/products.json")
      .pipe(map((response: any) => response)
      );
  }


}
