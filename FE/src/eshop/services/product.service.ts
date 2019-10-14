import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Observable<Product[]>;

  constructor(private http: HttpClient) {
  }


  public getProducts(): Observable<Product[]> {
    return this.http.get('http://localhost:8080/api/getProducts')
      .pipe(map((response: any) => response)
      );
  }

  public deleteProduct(product: Product){
    return this.http.delete('http://localhost:8080/api/getProducts')
      .pipe(map((response: any) => response)
      );
  }


}
