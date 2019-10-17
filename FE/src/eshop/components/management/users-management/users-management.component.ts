import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user.model';
import {UserService} from '../../../services/user.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.css']
})
export class UsersManagementComponent implements OnInit {
  public users: Observable<User[]>;
  private newUser: any = {};

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.users = this.userService.getUsers();
  }

  createUser(user: User) {
    this.userService.createUser(user);
    this.users.subscribe(
      () => this.users = this.userService.getUsers()
    );
    this.newUser = {};
    this.users = this.userService.getUsers();
  }

  deleteUser(userID: number) {
    this.userService.deleteUser(userID);
    this.users.subscribe(
      () => this.users = this.userService.getUsers()
    );
  }

  editUser(user: User) {
    this.userService.editUser(user);
    this.users.subscribe(
      () => this.users = this.userService.getUsers()
    );
  }
}
