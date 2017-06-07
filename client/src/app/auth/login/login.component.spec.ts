/* tslint:disable:no-unused-variable */
/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />

import { TestBed,
    inject,
    fakeAsync,
    tick,
    async,
    ComponentFixture
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuthService } from '../auth.service';
import { LoginComponent } from './login.component';
import { IJsendResponse } from '../../shared/base.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import * as Rx from 'rxjs/Rx';
import { APP_ROUTER_PROVIDERS } from '../../app.routes'
import * as Mockito from 'ts-mockito';

describe('Component: Login', () => {
  class MockRouter {
    public currentPath: string

    public navigate(path) {
      this.currentPath = path
    }
  }

  let mockRouter = new MockRouter();
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;
  let mockService: AuthService;

  beforeEach(async(() => {
    mockService = Mockito.mock(AuthService)
    TestBed.configureTestingModule({
        declarations: [ LoginComponent ],
        imports:[ ReactiveFormsModule ],
        providers: [
          FormBuilder,
          { provide: Router, useValue: mockRouter },
        ]
      })
      .overrideComponent(LoginComponent, {
        set: {
          providers: [
            { provide: AuthService, useValue: Mockito.instance(mockService) }
          ]
        }
      });
    }
  ));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  })

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
      Mockito.when(mockService.login("test@test.com", "12345"))
        .thenReturn(new Rx.Observable<IJsendResponse>((observer: Rx.Subscriber<IJsendResponse>) => {
            observer.next({'status': 'success', 'data': {}, 'message': ''});
          }))

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
      Mockito.when(mockService.login("test@test.com", "12345"))
        .thenReturn(new Rx.Observable<IJsendResponse>((observer: Rx.Subscriber<IJsendResponse>) => {
            observer.error({'status': 'fail', 'data': {email: 'invalid email', password: 'invalid password'}, 'message': ''})
          }))

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
