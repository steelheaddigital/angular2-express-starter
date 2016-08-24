/* tslint:disable:no-unused-variable */
/// <reference path="../../../../typings/globals/jasmine/index.d.ts" />

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { TestBed, async, inject } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { NavbarComponent } from './navbar.component';
import * as TypeMoq from "typemoq";

describe('Component: Navbar', () => {
  class MockRouter {
    public currentPath: string

    public navigate(path) {
      this.currentPath = path
    }
  }
  let mockRouter = new MockRouter();

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
        {
          provide: Router, 
          useValue: mockRouter
        }
      ]
    }));

  it('should create an instance', () => {
    inject([Router],(router: Router) => {
      let mockService: TypeMoq.Mock<AuthService> = TypeMoq.Mock.ofType(AuthService);
      let component = new NavbarComponent(mockService.object, router)

      expect(component).toBeTruthy();
    })
  });

  describe('isLoggedIn method', () => {
    it('should return true if user is logged in', 
      inject([Router],(router: Router) => {
        let mockService: TypeMoq.Mock<AuthService> = TypeMoq.Mock.ofType(AuthService);
        mockService.setup(x => x.isLoggedIn()).returns(() => {return true;});
        let component = new NavbarComponent(mockService.object, router)

        let result: boolean = component.isLoggedIn();

        mockService.verify(x => x.isLoggedIn(), TypeMoq.Times.atLeastOnce());
        expect(result).toBe(true);
      })
    )

    it('should return false if user is not logged in', 
      inject([Router],(router: Router) => {
        let mockService: TypeMoq.Mock<AuthService> = TypeMoq.Mock.ofType(AuthService);
        mockService.setup(x => x.isLoggedIn()).returns(() => {return false;});
        let component = new NavbarComponent(mockService.object, router)

        let result: boolean = component.isLoggedIn();

        mockService.verify(x => x.isLoggedIn(), TypeMoq.Times.atLeastOnce());
        expect(result).toBe(false);
      })
    )
  })

  describe('logout method', () => {
    it('logs out user and navigates to home page',
      inject([Router],(router: Router) => {
          let mockService: TypeMoq.Mock<AuthService> = TypeMoq.Mock.ofType(AuthService);
          let component = new NavbarComponent(mockService.object, router)
          let logoutEvent: TypeMoq.Mock<Event> = TypeMoq.Mock.ofType(Event, TypeMoq.MockBehavior.Loose, 'test')
          component.logout(logoutEvent.object);

          mockService.verify(x => x.logout(), TypeMoq.Times.atLeastOnce());
          logoutEvent.verify(x => x.preventDefault(), TypeMoq.Times.atLeastOnce());
          expect(mockRouter.currentPath[0]).toEqual('./home')
      })
    )
  })
});
