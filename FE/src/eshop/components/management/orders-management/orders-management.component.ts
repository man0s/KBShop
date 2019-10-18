import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Order} from '../../../models/order.model';
import {OrderService} from '../../../services/order.service';

@Component({
  selector: 'app-orders-management',
  templateUrl: './orders-management.component.html',
  styleUrls: ['./orders-management.component.css']
})
export class OrdersManagementComponent implements OnInit {
  public orders: Observable<Order[]>;
  isDisable = false;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orders = this.orderService.getAllOrders();
  }

  editOrder(order: Order) {
    this.orderService.editOrder(order);
    this.orders.subscribe(
      () => this.orders = this.orderService.getAllOrders()
    );
  }

  onDisableUser(){
    this.isDisable = true;
  }

}
