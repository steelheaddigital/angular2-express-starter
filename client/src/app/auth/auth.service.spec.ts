/* tslint:disable:no-unused-variable */

import { TestBed,
    inject,
    fakeAsync,
    tick,
} from '@angular/core/testing';
import { AuthService } from './auth.service';
import { IJsendResponse } from '../shared/base.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import * as crypto from 'crypto-js';
import * as moment from 'moment';

describe('Service: Auth', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BaseRequestOptions,
      MockBackend,
      {
          provide: Http,
          useFactory: function(backend, defaultOptions) {
              return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
      },
      AuthService
    ]
  }));

  afterEach(() => {
    localStorage.removeItem('auth_token');
  })

  it('should inject AuthService',
    inject([AuthService],(service: AuthService) => {
        expect(service).toBeTruthy();
    })
  );

  describe('login method', () => {
    it('should login user',
      inject([AuthService, MockBackend], fakeAsync((authService:AuthService, mockBackend:MockBackend) => {
        var result:IJsendResponse;
        mockBackend.connections.subscribe((c: MockConnection) => {
          expect(c.request.url).toBe('http://localhost:3000/api/auth/local');
          expect(c.request.headers.get('Content-Type')).toBe('application/json')
          expect(c.request.getBody()).toBe(JSON.stringify({ email: 'test@test.com', password: '12345' }));
          let mockResponseBody: IJsendResponse = {
            status: 'success',
            data: {
              'token': '12345'
            },
            message: ''
          };
          let response = new ResponseOptions({body: JSON.stringify(mockResponseBody)});
          c.mockRespond(new Response(response));
        });
        authService.login('test@test.com', '12345').subscribe(response => {
          result = response;
        });
        tick();
        expect(result.data.token).toBe('12345');
        expect(result.status).toBe('success');
        expect(localStorage.getItem('auth_token')).toBe('12345')
      }))
    );

    it('should not set auth_token if user is not logged in',
      inject([AuthService, MockBackend], fakeAsync((authService:AuthService, mockBackend:MockBackend) => {
        var result: IJsendResponse;
        mockBackend.connections.subscribe((c: MockConnection) => {
          expect(c.request.url).toBe('http://localhost:3000/api/auth/local');
          expect(c.request.headers.get('Content-Type')).toBe('application/json')
          expect(c.request.getBody()).toBe(JSON.stringify({ email: 'test@test.com', password: '12345' }));
          let mockResponseBody: IJsendResponse = {
            status: 'fail',
            data: {
              'password': 'This password is not correct.'
            },
            message: ''
          };
          let response = new ResponseOptions({body: JSON.stringify(mockResponseBody), status: 401});
          c.mockRespond(new Response(response));
        });
        authService.login('test@test.com', '12345')
        .subscribe( response => {
          result = response
        });
        tick();
        expect(result.data.password).toBe('This password is not correct.');
        expect(result.status).toBe('fail');
        expect(localStorage.getItem('auth_token')).toBe(null)
      }))
    );
  })

  describe('logout method', () => {
    it('should delete auth_token', 
      inject([AuthService],(service: AuthService) => {
        localStorage.setItem('auth_token', '12345');
        service.logout();
        expect(localStorage.getItem('auth_token')).toBe(null);
      })
    )
  })

  describe('isLoggedIn method', () => {
    it('should return true if token is not expired',
      inject([AuthService],(service: AuthService) => {
        let jwtData = {
          exp: moment().add(1, "day").unix()
        }
        let token = AuthServiceSpecHelper.createJwt(jwtData);
        localStorage.setItem('auth_token', token);
        let result: boolean = service.isLoggedIn();
        expect(result).toBe(true);
      })
    )

    it('should return false if token is expired',
      inject([AuthService],(service: AuthService) => {
        let jwtData = {
          exp: moment().subtract(1, "day").unix()
        }
        let token = AuthServiceSpecHelper.createJwt(jwtData);
        localStorage.setItem('auth_token', token);
        let result: boolean = service.isLoggedIn();
        expect(result).toBe(false);
      })
    )
  })
});

module AuthServiceSpecHelper {
  export function createJwt(data){
    var header = {
      "alg": "HS256",
      "typ": "JWT"
    };

    var stringifiedHeader = crypto.enc.Utf8.parse(JSON.stringify(header));
    var encodedHeader = base64url(stringifiedHeader);

    var stringifiedData = crypto.enc.Utf8.parse(JSON.stringify(data));
    var encodedData = base64url(stringifiedData);

    var token = encodedHeader + "." + encodedData;

    var secret = "My very confidential secret!";

    var signature = crypto.HmacSHA256(token, secret);
    signature = base64url(signature);

    var signedToken = token + "." + signature;

    return signedToken;
  }

  function base64url(source) {
    // Encode in classical base64
    var encodedSource = crypto.enc.Base64.stringify(source);

    // Remove padding equal characters
    var ncodedSource = encodedSource.replace(/=+$/, '');

    // Replace characters according to base64url specifications
    var encodedSource = encodedSource.replace(/\+/g, '-');
    var encodedSource = encodedSource.replace(/\//g, '_');

    return encodedSource;
  }
}