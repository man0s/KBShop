import { Injectable } from '@angular/core';
import { Product } from '../shared/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products = [ new Product('Apple iPhone 11 Pro 256GB', 'https://i.imgur.com/fKEuHYq.jpg', 1429, 1),
    new Product('Samsung QLED 4K TV QE55Q70R 55" 4Κ Ultra HD', 'https://i.imgur.com/U4nbPb0.jpg', )
  ];

  constructor() { }

  getProducts = () => this.products;

}
