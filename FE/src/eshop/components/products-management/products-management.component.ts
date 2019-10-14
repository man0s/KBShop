import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import { Product } from 'src/eshop/models/product.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-products-management',
  templateUrl: './products-management.component.html',
  styleUrls: ['./products-management.component.css']
})
export class ProductsManagementComponent implements OnInit {
  public products: Observable<Product[]>;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.products = this.productService.getProducts();
  }

  deleteProduct(productID: number) {
    this.productService.deleteProduct(productID);
    this.products.subscribe(
      products => this.products = this.productService.getProducts()
    );
  }

  getProductQty(productID: number) {
    this.productService.getProductQty(productID);
  }


}
