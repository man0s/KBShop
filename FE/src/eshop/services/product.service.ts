import { Injectable } from '@angular/core';
import { Product } from '../shared/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products = [ new Product('Apple iPhone 11 Pro 256GB', 'https://i.imgur.com/fKEuHYq.jpg', 1429, 1),
    new Product('Samsung QLED 4K TV QE55Q70R 55" 4Κ Ultra HD', 'https://i.imgur.com/U4nbPb0.jpg', 999, 1),
    new Product('Apple iPad Tablet WiFi 7Gen 32Gb 10.2', 'https://i.imgur.com/61JrAYR.jpg', 419, 1),
    new Product('LG GSX961NSAZ Fridge Freezer', 'https://i.imgur.com/wRQxoDm.jpg', 1768, 1),
    new Product('Lenovo Legion Y530- 15ICH Laptop (Core i7 8750H/8 GB/512 GB/GTX 1060 6 GB)', 'https://i.imgur.com/jNxQVC3.jpg', 1599, 1),
    new Product('HP Inkjet OfficeJet Pro 9023', 'https://i.imgur.com/euR8gYZ.jpg', 229, 1),
    new Product('dji Mavic 2 Pro', 'https://i.imgur.com/eP63NSu.jpg', 1499, 1)
  ];

  constructor() { }

  getProducts = () => this.products;

}
