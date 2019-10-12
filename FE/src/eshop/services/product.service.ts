import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { CachingServiceBase } from "./caching.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService extends CachingServiceBase {

  private products: Observable<Product[]>;

  constructor(private http: HttpClient) {
    super();
  }


  public all(): Observable<Product[]> {
    return this.cache<Product[]>(() => this.products,
      (val: Observable<Product[]>) => this.products = val,
      () => this.http
        .get("./assets/products.json").pipe(
          map((response: any) => response)
        ));
  }


}
