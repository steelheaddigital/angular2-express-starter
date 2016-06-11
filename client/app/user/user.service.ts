import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseService, JsendResponse } from '../shared/base.service';
import {AuthHttp, AuthConfig, JwtHelper} from 'angular2-jwt';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService extends BaseService {
  constructor (private http: Http) {
    super();
  }
  
  private userPath = 'api/user';
  jwtHelper: JwtHelper = new JwtHelper();
  
  public create(name: string, email: string, password: string): Observable<boolean>{
    let body = JSON.stringify({ name, email, password })
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    
    return this.http.post(this.userPath, body, options)
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
}

export class User {
  id: number;
  name: string;
  email: string;
}