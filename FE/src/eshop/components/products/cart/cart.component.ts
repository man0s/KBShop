import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {Product} from '../../../models/product.model';
import {ProductService} from '../../../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
