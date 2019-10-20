import { Injectable } from '@angular/core';
import { LocalStorageService } from './storage.service';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const API_ENDPOINT = "http://localhost:8080/api";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: Observable<User[]>;


  constructor(private http: HttpClient, private localStorage: LocalStorageService) {
  }

  ngOnInit() {
  }

  public getloggedInUser(): User {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  public setloggedInUser(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  public clearloggedInUser() {
    localStorage.setItem('currentUser', null);
  }

  public getUsers(): Observable<User[]> {
    return this.http.get(API_ENDPOINT + "/getUsers")
      .pipe(map((response: any) => response)
      );
  }

  public getUser(userEmail: String): Observable<User> {
    return this.http.get<User>(API_ENDPOINT + "/getUser/" + userEmail)
      .pipe(map((response: any) => response as User)
      );
  }

  public createUser(user: User) {
    return this.http.post(API_ENDPOINT + "/createUser", user)
      .subscribe(
        result => {
          console.log("User with email(" + user.email + ") has been created!")
        },
        err => console.error(err)
      );
  }

  public editUser(user: User){
    this.http.put(API_ENDPOINT + "/editUser", user)
      .subscribe(
        result => console.log("User with id(" + user.id + ") has been updated!"),
        err => console.error(err)
      );
  }

  public deleteUser(userID: number){
    this.http.delete(API_ENDPOINT + "/deleteUser/" + userID)
      .subscribe(
        result => console.log("User with id(" + userID + ") has been deleted!"),
        err => console.error(err)
      );
  }




}
