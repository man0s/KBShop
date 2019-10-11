import { Injectable } from '@angular/core';
import { Product } from '../shared/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products = [ new Product('Apple iPhone 11 Pro 256GB', 'https://i.imgur.com/fKEuHYq.jpg', 1429, 1)
  ];

  constructor() { }

  getProducts = () => this.products;

}
