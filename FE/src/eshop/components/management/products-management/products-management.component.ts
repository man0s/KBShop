import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../../services/product.service';
import { Product } from 'src/eshop/models/product.model';
import {Observable} from 'rxjs';
import {CartService} from '../../../services/cart.service';

@Component({
  selector: 'app-products-management',
  templateUrl: './products-management.component.html',
  styleUrls: ['./products-management.component.css']
})
export class ProductsManagementComponent implements OnInit {
  public products: Observable<Product[]>;
  private newProduct: any = {};

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit() {
    this.products = this.productService.getProducts();
  }

  createProduct(product: Product) {
    this.productService.createProduct(product);
    this.products.subscribe(
      products => this.products = this.productService.getProducts()
    );
    this.newProduct = {};
  }

  deleteProduct(productID: number) {
    this.productService.deleteProduct(productID);
    this.products.subscribe(
      products => this.products = this.productService.getProducts()
    );
  }

  editProduct(product: Product) {
    this.productService.editProduct(product);
    this.cartService.empty();
    this.products.subscribe(
      products => { this.products = this.productService.getProducts();
      }
    );
  }

}
