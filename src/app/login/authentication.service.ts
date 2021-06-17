import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './model/user';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';

const USER_KEY = 'angularcrm.user'
const TOKEN_KEY = 'angularcrm.jwt'

interface AuthentResponse {
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private user?: User;
  private _jwtToken?: string;

  constructor(private httpClient: HttpClient) {
    if(sessionStorage.getItem(USER_KEY) != null){
      this.user = JSON.parse(sessionStorage.getItem(USER_KEY)!);
    }
    if(sessionStorage.getItem(TOKEN_KEY) != null){
      this._jwtToken = sessionStorage.getItem(TOKEN_KEY)!;
    }

  }

  get isAuthenticated(): boolean {
    return this.user !== undefined;
  }

  get jwtToken(): string | undefined {
    return this._jwtToken;
  }

  disconnect():void {
    this.user = undefined;
    sessionStorage.removeItem(USER_KEY);
  }

  authentUser (login:string, password:string):Observable<User>{
    return this.httpClient
            .post<AuthentResponse>('api/auth/login',
                    {email: login, password: password})
            .pipe(
              map((authentResponse)=>{
                this._jwtToken = authentResponse.token;
                this.user = authentResponse.user;
                sessionStorage.setItem(TOKEN_KEY, this._jwtToken);
                sessionStorage.setItem(USER_KEY, JSON.stringify(this.user));
                return this.user;
              })
            )
  }
}
