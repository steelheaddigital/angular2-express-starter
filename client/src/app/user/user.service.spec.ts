/* tslint:disable:no-unused-variable */
/// <reference path="../../../typings/globals/jasmine/index.d.ts" />

import { TestBed,
    inject,
    fakeAsync,
    tick
} from '@angular/core/testing';
import { UserService } from './user.service';
import { IJsendResponse } from '../shared/base.service';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';

describe('Service: User', () => {
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
      UserService
    ]
  }));

  afterEach(() => {
    localStorage.removeItem('auth_token');
  })

  it('should inject UserService',
    inject([UserService], (userService: UserService) => {
      expect(userService).toBeTruthy();
    })
  );

  describe('createUser method', () => {

    it('should create user and log them in',
      inject([UserService, MockBackend], fakeAsync((userService:UserService, mockBackend:MockBackend) => {
        var result:boolean;
        mockBackend.connections.subscribe(c => {
          expect(c.request.url).toBe('http://192.168.11.3:3000/api/user');
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
        userService.create('test', 'test@test.com', '12345').subscribe(response => {
          result = response;
        });
        tick();
        expect(result).toBe(true);
        expect(localStorage.getItem('auth_token')).toBe('12345')
      }))
    );

    it('should not log in user if create fails',
      inject([UserService, MockBackend], fakeAsync((userService:UserService, mockBackend:MockBackend) => {
        var result:boolean;
        mockBackend.connections.subscribe(c => {
          expect(c.request.url).toBe('http://192.168.11.3:3000/api/user');
          let mockResponseBody: IJsendResponse = {
            status: 'fail',
            data: null,
            message: 'request fails'
          };
          let response = new ResponseOptions({body: JSON.stringify(mockResponseBody)});
          c.mockRespond(new Response(response));
        });
        userService.create('test', 'test@test.com', '12345').subscribe(response => {
          result = response;
        });
        tick();
        expect(result).toBe(false);
        expect(localStorage.getItem('auth_token')).toBe(null)
      }))
    );
  });

  describe('exists method', () => {

    it('should return true if user exists',
      inject([UserService, MockBackend], fakeAsync((userService:UserService, mockBackend:MockBackend) => {
        var result:boolean;
        mockBackend.connections.subscribe(c => {
          expect(c.request.url).toBe('http://192.168.11.3:3000/api/user/exists?name=test');
          let mockResponseBody: IJsendResponse = {
            status: 'success',
            data: {
              exists: true
            },
            message: ''
          };
          let response = new ResponseOptions({body: JSON.stringify(mockResponseBody)});
          c.mockRespond(new Response(response));
        });
        userService.exists({name: 'test'}).subscribe(response => {
          result = response;
        });
        tick();
        expect(result).toBe(true);
      }))
    );

    it('should return false if user does not exist',
      inject([UserService, MockBackend], fakeAsync((userService:UserService, mockBackend:MockBackend) => {
        var result:boolean;
        mockBackend.connections.subscribe(c => {
          expect(c.request.url).toBe('http://192.168.11.3:3000/api/user/exists?name=test');
          let mockResponseBody: IJsendResponse = {
            status: 'success',
            data: {
              exists: false
            },
            message: ''
          };
          let response = new ResponseOptions({body: JSON.stringify(mockResponseBody)});
          c.mockRespond(new Response(response));
        });
        userService.exists({name: 'test'}).subscribe(response => {
          result = response;
        });
        tick();
        expect(result).toBe(false);
      }))
    );
  })
});
