import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import { User } from 'src/eshop/models/user.model';
import {Observable} from 'rxjs';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private userEmail: string;
  private registerEmail: string;
  private registerName: string;
  private registerSurname: string;
  private newUser: any;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  private login(userEmail: string) {
    return this.userService.getUser(userEmail).subscribe(
        user => {
          if(user){
            console.log("Logging in user with email(" + user.email + ")");
            this.userService.setloggedInUser(user);
          } else {
            console.log("User with email(" + userEmail + ") is not registered!");
          }
        },
        error => console.log(error)
      );
  }

  private register(registerName: string, registerSurname: string, registerEmail: string) {
    this.newUser = new User;
    this.newUser.name = registerName;
    this.newUser.surname = registerSurname;
    this.newUser.email = registerEmail;
    console.log("Registering user with email( " + registerEmail + ")");
    this.userService.createUser(this.newUser);
  }

  private logout() {
    console.log("Logging out user with email( " + this.userService.getloggedInUser().email + ")");
    this.userService.clearloggedInUser();
  }

  public getloggedInUser() {
    return this.userService.getloggedInUser();
  }

}
