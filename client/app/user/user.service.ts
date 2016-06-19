import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseService, JsendResponse, JsonRequest } from '../shared/base.service';
import { AuthHttp, AuthConfig, JwtHelper } from 'angular2-jwt';
import { USER_PATH, USER_EXISTS_PATH } from '../shared/api';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService extends BaseService {
  jwtHelper: JwtHelper;
  
  constructor (private http: Http) {
    super();
    this.jwtHelper = new JwtHelper();
  }
  
  public create(name: string, email: string, password: string): Observable<boolean>{
    let request = super.BuildJsonRequest({ name, email, password });

    return this.http.post(USER_PATH, request.body, request.options)
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

  public exists(query: Object): Observable<boolean> {
    let params: URLSearchParams = new URLSearchParams();
    
    for(var key in query) {
      params.set(key.toString(), query[key]);
    }

    return this.http.get(USER_EXISTS_PATH, {
      search: params
    })
    .map(super.extractData)
    .map((res) => {
      return res.data.exists
    })
    .catch(super.handleError)
  }
}

export class User {
  id: number;
  name: string;
  email: string;
}