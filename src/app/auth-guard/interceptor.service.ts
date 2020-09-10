import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req, next) {


    if (req.headers.get('skip')) {
      return next.handle(req);


    }


    const tokenizedReq = req.clone({
      setHeaders: {
        'authorization': 'Bearer ' + this.authService.getToken()
      }
    });
    return next.handle(tokenizedReq);
  }
}
