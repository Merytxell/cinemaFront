import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {

  constructor(private authService : AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtToken = this.authService.getToken();
    if(jwtToken){
      request = request.clone({
        headers : request.headers.set('Authorization', "Bearer " + JSON.parse(jwtToken))
      })
    }
    return next.handle(request);
  }
}