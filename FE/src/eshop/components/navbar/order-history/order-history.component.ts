import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Order} from '../../../models/order.model';
import {OrderService} from '../../../services/order.service';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  public orders = [];

  constructor(private orderService: OrderService, private userService: UserService) { }

  ngOnInit() {
    this.orderService.getOrders(this.userService.getloggedInUser().email).subscribe(
      res => this.orders = res
    );
  }

}
