import { Component, OnInit, OnDestroy  } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Cart} from '../../../models/cart.model';
import {Product} from '../../../models/product.model';
import {ProductService} from '../../../services/product.service';
import {CartService} from '../../../services/cart.service';
import {CartProduct} from '../../../models/cart-product.model';
import {LocalStorageService} from '../../../services/storage.service';
import { Order } from 'src/eshop/models/order.model';
import {OrderService} from '../../../services/order.service';
import {UserService} from '../../../services/user.service';
import {Form, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public cart: Observable<Cart>;
  public cartItems: CartProduct[];
  public itemCount: number;
  checkoutForm;

  private cartSubscription: Subscription;

  public constructor(private cartService: CartService, private userService: UserService,  private formBuilder: FormBuilder, private orderService: OrderService, private router: Router) {
      this.checkoutForm = this.formBuilder.group({
        user: this.userService.getloggedInUser(),
        name: this.userService.getloggedInUser().name,
        surname: this.userService.getloggedInUser().surname,
        address: '',
        email: this.userService.getloggedInUser().email,
        phone: '',
        cart: {}
      });
      //disable the email input
      this.checkoutForm.get('email').disable();
  }

  onSubmit(customerData) {
    customerData.cart = this.cartService.retrieveCart();
    this.createOrder(customerData);

    this.emptyCart();
    this.checkoutForm.reset();
    this.router.navigate(['/']);
  }

  public emptyCart(): void {
    this.cartService.empty();
  }

  public removeProduct(product: Product): void {
    this.cartService.removeItem(product);
  }

  public ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.cartSubscription = this.cart.subscribe((cart) => {
      this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
    });
  }

  public ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  public createOrder(customerData) {
    this.orderService.createOrder(customerData);
  }
}
