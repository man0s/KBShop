import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.loggedInUser = {'id': '1', 'email': 'man0s@kbshop.gr'};
  }

  public getUser() {
    return this.userService.loggedInUser;
  }

}
