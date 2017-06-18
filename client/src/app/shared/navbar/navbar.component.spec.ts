/* tslint:disable:no-unused-variable */
/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />

import { DebugElement } from '@angular/core';
import { TestBed, async, inject, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { MockBackend } from '@angular/http/testing';
import { Http, RequestOptions, BaseRequestOptions } from '@angular/http';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { NavbarComponent } from './navbar.component';
import { HomeComponent } from '../../home/home.component';
import { SignupComponent } from '../../user/signup';
import { LoginComponent } from '../../auth/login';
import { AppComponent } from '../../app.component';
import { CollapseModule } from 'ngx-bootstrap';
import { routes } from '../../app.routes'

describe('Component: Navbar', () => {
  let component: NavbarComponent;
  let service: AuthService;
  let location: Location;
  let router: Router;
  let backend: MockBackend;
  let spy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ 
          NavbarComponent, 
          HomeComponent, 
          SignupComponent, 
          LoginComponent,
          AppComponent
        ],
        imports: [ 
          CollapseModule, 
          ReactiveFormsModule,
          RouterTestingModule.withRoutes(routes) ],
        providers: [
          FormBuilder,
          MockBackend,
          BaseRequestOptions,
          {
            provide: Http,
            deps: [MockBackend, BaseRequestOptions],
            useFactory: (backend: MockBackend, options: BaseRequestOptions) => { return new Http(backend, options); }
          }
        ]
      })
    }
  ));

  beforeEach(() => {
    router = TestBed.get(Router); 
    location = TestBed.get(Location);
    TestBed.createComponent(AppComponent);
    backend = new MockBackend();
    service = new AuthService(new Http(backend, null))
    component = new NavbarComponent(service, router)
  })

  afterEach(() => { 
    service = null;
    component = null;
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  describe('isLoggedIn method', () => {

    it('should return true if user is logged in', () => {
      spy = spyOn(service, 'isLoggedIn').and.returnValue(true);
      let result: boolean = component.isLoggedIn();

      expect(result).toBe(true);
    })

    it('should return false if user is not logged in', () => {
      spy = spyOn(service, 'isLoggedIn').and.returnValue(false);
      let result: boolean = component.isLoggedIn();

      expect(result).toBe(false);
    })
  })

  describe('logout method', () => {
    it('logs out user and navigates to home page', fakeAsync(() => {
      let logoutEvent: Event = new Event('test')
      spy = spyOn(service, 'logout');

      component.logout(logoutEvent);
      tick();
      expect(service.logout).toHaveBeenCalled();
      expect(location.path()).toEqual('/home')
    }))
  })
});
