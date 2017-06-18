/* tslint:disable:no-unused-variable */
/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />

import { 
    fakeAsync,
    tick,
    async
} from '@angular/core/testing';
import { AuthService } from '../auth.service';
import { LoginComponent } from './login.component';
import { IJsendResponse } from '../../shared/base.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import * as Rx from 'rxjs/Rx';
import { APP_ROUTER_PROVIDERS } from '../../app.routes'
import { MockBackend } from '@angular/http/testing';
import { Http, RequestOptions } from '@angular/http';

describe('Component: Login', () => {
  class MockRouter {
    public currentPath: string

    public navigate(path) {
      this.currentPath = path
    }
  }

  let mockRouter = new MockRouter();
  let component: LoginComponent;
  let service: AuthService;
  let backend: MockBackend;
  let spy: any;

  beforeEach(() => {
    backend = new MockBackend();
    service = new AuthService(new Http(backend, null))
    component = new LoginComponent(service, <Router><any>mockRouter, new FormBuilder())
  })

  afterEach(() => { 
    service = null;
    component = null;
  });

  it('should create an instance', () => {
      expect(component).toBeTruthy();
      expect(component.email instanceof FormControl).toBe(true);
      expect(component.password instanceof FormControl).toBe(true);
      expect(component.loginForm instanceof FormGroup).toBe(true);
      expect(component.loginForm.contains('email')).toBe(true);
      expect(component.loginForm.contains('password')).toBe(true);
  })

  describe('signup method', () => {
    it('should login user and navigate to home page', fakeAsync(() => {

      spy = spyOn(service, 'login').and.returnValue(
        new Rx.Observable<IJsendResponse>((observer: Rx.Subscriber<IJsendResponse>) => {
          observer.next({'status': 'success', 'data': {}, 'message': ''});
        })
      );

      component.email.setValue("test@test.com");
      component.password.setValue("12345");
      component.login()

      tick();

      expect(mockRouter.currentPath[0]).toEqual('./home')
      expect(component.loginForm.valid).toBe(true);
      expect(component.email.valid).toBe(true);
      expect(component.password.valid).toBe(true)
      expect(component.password.errors).toBe(null)
      expect(component.email.errors).toBe(null)
    }))
    

    it('should display errors if login fails', fakeAsync(() => {
      spy = spyOn(service, 'login').and.returnValue(
        new Rx.Observable<IJsendResponse>((observer: Rx.Subscriber<IJsendResponse>) => {
            observer.error({'status': 'fail', 'data': {email: 'invalid email', password: 'invalid password'}, 'message': ''})
        })
      );

      component.email.setValue("test@test.com");
      component.password.setValue("12345");
      component.login();

      tick();

      expect(component.loginForm.valid).toBe(false);
      expect(component.email.valid).toBe(false);
      expect(component.email.errors).toEqual({'serverValidation': true});
      expect(component.password.valid).toBe(false)
      expect(component.password.errors).toEqual({'serverValidation': true});
    }))
  })
});
