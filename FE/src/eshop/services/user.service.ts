import { Injectable } from '@angular/core';
import {LocalStorageService} from './storage.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private localStorage: LocalStorageService) {
  }

  ngOnInit() {
  }

  private _loggedInUser?: User;

  get loggedInUser(): User {
    return this._loggedInUser;
  }
  set loggedInUser(user: User) {
    this._loggedInUser = user;
  }



}
