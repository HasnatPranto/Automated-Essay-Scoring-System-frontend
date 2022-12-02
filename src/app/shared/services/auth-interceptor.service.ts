import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService:AuthenticationService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.authService.getSessionInfo();
    if(token==null)  return next.handle(request);
    else{
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token.jwt_token}`
        }
      });
      return next.handle(request);
    }
  }
}
