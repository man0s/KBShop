import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import {Observable, Observer} from 'rxjs';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products: Observable<Product[]>;
  public sortBool = false;
  public countNum = 100;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.products = this.productService.getProducts();
  }

  setSort() {
    if(this.sortBool) { this.sortBool = false; }
    else { this.sortBool = true; }
  }

  setCount(count: number) {
    this.countNum = count;
  }

}
