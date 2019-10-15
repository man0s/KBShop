import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import { User } from 'src/eshop/models/user.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private userEmail: string;

  constructor(private userService: UserService) { }

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

  private logout() {
    console.log("Logging out user with email( " + this.userService.getloggedInUser().email + ")");
    this.userService.clearloggedInUser();
  }

  public getloggedInUser() {
    return this.userService.getloggedInUser();
  }

}
