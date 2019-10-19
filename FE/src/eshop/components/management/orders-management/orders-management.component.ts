import { Component, OnInit } from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import {Order} from '../../../models/order.model';
import {OrderService} from '../../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders-management',
  templateUrl: './orders-management.component.html',
  styleUrls: ['./orders-management.component.css']
})
export class OrdersManagementComponent implements OnInit {
  public orders: Observable<Order[]>;

  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit() {
    this.orders = this.orderService.getAllOrders();
    this.orders.subscribe(
      () => this.orders = this.orderService.getAllOrders()
    );
  }


  editOrder(order: Order) {
    this.orderService.editOrder(order);
    this.orders.subscribe(
      () => this.orders = this.orderService.getAllOrders()
    );
  }

  deleteOrder(orderID: number) {
    this.orderService.deleteOrder(orderID);
    this.orders.subscribe(
      () => this.orders = this.orderService.getAllOrders()
    );
    this.router.navigateByUrl('/management/orders', {skipLocationChange: true}).then(() => this.router.navigate(['/management/orders']));
  }

}
