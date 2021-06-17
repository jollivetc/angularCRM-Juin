import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../login/authentication.service';

@Injectable()
export class JWTIntercepteurService implements HttpInterceptor{

  constructor(private authenticationService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any>{
    const token = this.authenticationService.jwtToken;
    const clone = req.clone({setHeaders:{Authorization: `Bearer ${token}`}});
    return next.handle(clone);
  }
}
