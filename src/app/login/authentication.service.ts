import { Injectable } from '@angular/core';
import { User } from './model/user';

const USER_KEY = 'angularcrm.user'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private user?: User;

  constructor() {
    if(sessionStorage.getItem(USER_KEY) != null){
      this.user = JSON.parse(sessionStorage.getItem(USER_KEY)!);
    }
  }

  get isAuthenticated(): boolean {
    return this.user !== undefined;
  }

  disconnect():void {
    this.user = undefined;
    sessionStorage.removeItem(USER_KEY);
  }

  authentUser (login:string, password:string):User{
    this.user = {
      userId: 1,
      login : login,
      firstname: 'John',
      lastname: 'Doe'
    }
    sessionStorage.setItem(USER_KEY, JSON.stringify(this.user));
    return this.user;
  }
}
