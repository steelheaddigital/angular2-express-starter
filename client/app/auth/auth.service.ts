import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseService, JsendResponse } from '../shared/base.service';
import {AuthHttp, AuthConfig, JwtHelper} from 'angular2-jwt';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService extends BaseService {
  constructor (private http: Http) {
    super();
  }
  
  private loginPath = '/api/auth/local';
  jwtHelper: JwtHelper = new JwtHelper();
  
  public login(email: string, password: string): Observable<boolean>{
    let body = JSON.stringify({ email, password })
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    
    return this.http.post(this.loginPath, body, options)
      .map(super.extractData)
      .map((res) => {
        let success = res.status === 'success';
        if (success) {
          localStorage.setItem('auth_token', res.data.token);
        }

        return success;
      })
      .catch(super.handleError);
  }

  logout() {
    localStorage.removeItem('auth_token');
  }

  isLoggedIn() {
    let token = localStorage.getItem('auth_token')
    let isLoggedIn = token && !this.jwtHelper.isTokenExpired(token);
    return isLoggedIn;
  }  
}