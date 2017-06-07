/* tslint:disable:no-unused-variable */
/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { TestBed, async, inject, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { NavbarComponent } from './navbar.component';
import { HomeComponent } from '../../home/home.component';
import { SignupComponent } from '../../user/signup';
import { LoginComponent } from '../../auth/login';
import { AppComponent } from '../../app.component';
import * as Mockito from 'ts-mockito';
import { CollapseModule } from 'ng2-bootstrap';
import { routes } from '../../app.routes'

describe('Component: Navbar', () => {
  let fixture: ComponentFixture<NavbarComponent>;
  let component: NavbarComponent;
  let mockService: AuthService;
  let location: Location;
  let router: Router;

  beforeEach(async(() => {
    mockService = Mockito.mock(AuthService)
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
          FormBuilder
        ]
      })
      .overrideComponent(NavbarComponent, {
        set: {
          providers: [
            { provide: AuthService, useValue: Mockito.instance(mockService) }
          ]
        }
      });
    }
  ));

  beforeEach(() => {
    router = TestBed.get(Router); 
    location = TestBed.get(Location);
    TestBed.createComponent(AppComponent);
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
  })

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  describe('isLoggedIn method', () => {

    it('should return true if user is logged in', () => {
      Mockito.when(mockService.isLoggedIn()).thenReturn(true);

      let result: boolean = component.isLoggedIn();

      expect(result).toBe(true);
    })

    it('should return false if user is not logged in', () => {
      Mockito.when(mockService.isLoggedIn()).thenReturn(false);
      let result: boolean = component.isLoggedIn();

      expect(result).toBe(false);
    })
  })

  describe('logout method', () => {
    it('logs out user and navigates to home page', fakeAsync(() => {
      let logoutEvent: Event = new Event('test')

      component.logout(logoutEvent);
      tick();
      Mockito.verify(mockService.logout());
      expect(location.path()).toEqual('/home')
    }))
  })
});
