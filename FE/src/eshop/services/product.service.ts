import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products = [ new Product(1, 'Apple iPhone 11 Pro 256GB', 'https://i.imgur.com/fKEuHYq.jpg', 1429, 1),
    new Product(2, 'Samsung QLED 4K TV QE55Q70R 55" 4Κ Ultra HD', 'https://i.imgur.com/U4nbPb0.jpg', 999, 1),
    new Product(3, 'Apple iPad Tablet WiFi 7Gen 32Gb 10.2', 'https://i.imgur.com/61JrAYR.jpg', 419, 1),
    new Product(4, 'LG GSX961NSAZ Fridge Freezer', 'https://i.imgur.com/wRQxoDm.jpg', 1768, 1),
    new Product(5, 'Lenovo Legion Y530- 15ICH Laptop (Core i7 8750H/8 GB/512 GB/GTX 1060 6 GB)', 'https://i.imgur.com/jNxQVC3.jpg', 1599, 1),
    new Product(6, 'HP Inkjet OfficeJet Pro 9023', 'https://i.imgur.com/euR8gYZ.jpg', 229, 1),
    new Product(7, 'dji Mavic 2 Pro', 'https://i.imgur.com/eP63NSu.jpg', 1499, 1)
  ];

  constructor(
    // private httpclient : HttpClient
  ) {}


  getProducts = () => this.products;

}
