import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseService, JsendResponse } from '../shared/base.service';
import { AuthHttp, AuthConfig, JwtHelper } from 'angular2-jwt';
import { LOGIN_PATH } from '../shared/api';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthService extends BaseService {
  jwtHelper: JwtHelper;

  constructor (private http: Http) {
    super();
    this.jwtHelper = new JwtHelper();
  }
  
  public login(email: string, password: string): Observable<JsendResponse>{
    let body = JSON.stringify({ email, password })
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    
    return this.http.post(LOGIN_PATH, body, options)
      .map(super.extractData)
      .map((res) => {
        if (res.status === 'success') {
          localStorage.setItem('auth_token', res.data.token);
        } else {
          Observable.throw(res);
        }

        return res;
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