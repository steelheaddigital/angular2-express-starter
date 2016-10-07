/* tslint:disable:no-unused-variable */
/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />

import { TestBed,
    inject,
    fakeAsync,
    tick,
    async
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuthService } from '../auth.service';
import { LoginComponent } from './login.component';
import { IJsendResponse } from '../../shared/base.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import * as Rx from 'rxjs/Rx';
import { APP_ROUTER_PROVIDERS } from '../../app.routes'
let td = require('testdouble');

describe('Component: Login', () => {

  class MockRouter {
    public currentPath: string

    public navigate(path) {
      this.currentPath = path
    }
  }
  let mockRouter = new MockRouter();

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
        FormBuilder,
        {
          provide: Router, 
          useValue: mockRouter
        }
      ]
    }));

  it('should create an instance', () => {
    inject([FormBuilder, Router],(formBuilder: FormBuilder, router: Router) => {
      let mockService: AuthService = td.object(AuthService)
      let component = new LoginComponent(mockService, router, formBuilder)

      expect(component).toBeTruthy();
      expect(component.email instanceof FormControl).toBe(true);
      expect(component.password instanceof FormControl).toBe(true);
      expect(component.loginForm instanceof FormGroup).toBe(true);
      expect(component.loginForm.contains('email')).toBe(true);
      expect(component.loginForm.contains('password')).toBe(true);
    })
  })

  describe('signup method', () => {
    it('should login user and navigate to home page',
      inject([FormBuilder, Router], (formBuilder: FormBuilder, router: Router) => {
        let mockService: AuthService = td.object(AuthService)
        td.when(mockService.login("test@test.com", "12345"))
          .thenReturn(new Rx.Observable<IJsendResponse>((observer: Rx.Subscriber<IJsendResponse>) => {
              observer.next({'status': 'success', 'data': {}, 'message': ''});
            }))

        let component = new LoginComponent(mockService, router, formBuilder);
        component.email.setValue("test@test.com");
        component.password.setValue("12345");

        component.login()

        expect(mockRouter.currentPath[0]).toEqual('./home')
        expect(component.loginForm.valid).toBe(true);
        expect(component.email.valid).toBe(true);
        expect(component.password.valid).toBe(true)
        expect(component.password.errors).toBe(null)
        expect(component.email.errors).toBe(null)
      })
    )

    it('should display errors if login fails',
      inject([FormBuilder, Router], (formBuilder: FormBuilder, router: Router) => {
        let mockService: AuthService = td.object(AuthService)
        td.when(mockService.login("test@test.com", "12345"))
          .thenReturn(new Rx.Observable<IJsendResponse>((observer: Rx.Subscriber<IJsendResponse>) => {
              observer.error({'status': 'fail', 'data': {email: 'invalid email', password: 'invalid password'}, 'message': ''})
            }))

        let component = new LoginComponent(mockService, router, formBuilder);
        component.email.setValue("test@test.com");
        component.password.setValue("12345");

        component.login()

        expect(component.loginForm.valid).toBe(false);
        expect(component.email.valid).toBe(false);
        expect(component.email.errors).toEqual({'serverValidation': true});
        expect(component.password.valid).toBe(false)
        expect(component.password.errors).toEqual({'serverValidation': true});
      })
    )
  })
});
