/* tslint:disable:no-unused-variable */
/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />

import { TestBed,
    inject,
    fakeAsync,
    tick,
    async
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SignupComponent } from './signup.component';
import { UserService } from '../user.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as Rx from 'rxjs/Rx';
let td = require('testdouble');

describe('Component: Signup', () => {

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      FormBuilder
    ]
  }));

  it('should inject SignupComponent and build form',
    inject([FormBuilder],(formBuilder: FormBuilder) => {
      let mockService: UserService = td.object(UserService)
      let component = new SignupComponent(mockService, formBuilder)

      expect(component).toBeTruthy();
      expect(component.name instanceof FormControl).toBe(true);
      expect(component.email instanceof FormControl).toBe(true);
      expect(component.password instanceof FormControl).toBe(true);
      expect(component.signupForm instanceof FormGroup).toBe(true);
      expect(component.signupForm.contains('name')).toBe(true);
      expect(component.signupForm.contains('email')).toBe(true);
      expect(component.signupForm.contains('password')).toBe(true);
    })
  );

  describe('signup method', () => {
    it('should signup user and reset form on success',
      inject([FormBuilder], (formBuilder: FormBuilder) => {
        let mock: UserService = td.object(UserService);
        td.when(mock.create("test", "test@test.com", "12345"))
          .thenReturn(new Rx.Observable<boolean>((observer: Rx.Subscriber<boolean>) => {
            observer.next(true);
          }))

        let component = new SignupComponent(mock, formBuilder);
        component.name.setValue("test");
        component.email.setValue("test@test.com");
        component.password.setValue("12345");

        component.signup()

        expect(component.email.value).toBe("");
        expect(component.name.value).toBe("");
        expect(component.password.value).toBe("");
      })
    )

    it('should not reset form if signup fails',
      inject([FormBuilder], (formBuilder: FormBuilder) => {
        let mock: UserService = td.object(UserService);
        td.when(mock.create("test", "test@test.com", "12345"))
          .thenReturn(new Rx.Observable<boolean>((observer: Rx.Subscriber<boolean>) => {
            observer.next(false);
          }))

        let component = new SignupComponent(mock, formBuilder);
        component.name.setValue("test");
        component.email.setValue("test@test.com");
        component.password.setValue("12345");

        component.signup()

        expect(component.name.value).toBe("test");
        expect(component.email.value).toBe("test@test.com");
        expect(component.password.value).toBe("12345");
      })
    )
  })

  describe('Validations', () => {
    it('should not mark name invalid if it does not exist',
      inject([FormBuilder], fakeAsync((formBuilder: FormBuilder) => {
        let mock: UserService = td.object(UserService);
        td.when(mock.exists(td.matchers.anything()))
          .thenReturn(new Rx.Observable<boolean>((observer: Rx.Subscriber<boolean>) => {
            observer.next(false);
          }))

        let component = new SignupComponent(mock, formBuilder);

        (<FormControl>component.signupForm.controls['name']).setValue("test");
        
        tick(500);

        expect(component.name.valid).toBe(true);
        expect(component.name.errors).toBe(null);
      })
    ))

    it('should mark name invalid if it exists',
      inject([FormBuilder], fakeAsync((formBuilder: FormBuilder) => {
        let mock: UserService = td.object(UserService);
        td.when(mock.exists(td.matchers.anything()))
          .thenReturn(new Rx.Observable<boolean>((observer: Rx.Subscriber<boolean>) => {
            observer.next(true);
          }))
        let component = new SignupComponent(mock, formBuilder);

        (<FormControl>component.signupForm.controls['name']).setValue("test");
        
        tick(500);

        expect(component.name.valid).toBe(false);
        expect(component.name.errors['nameTaken']).toBe(true);
      })
    ))

    it('should not mark email invalid if it does not exist',
      inject([FormBuilder], fakeAsync((formBuilder: FormBuilder) => {
        let mock: UserService = td.object(UserService);
        td.when(mock.exists(td.matchers.anything()))
          .thenReturn(new Rx.Observable<boolean>((observer: Rx.Subscriber<boolean>) => {
            observer.next(false);
          }))
        let component = new SignupComponent(mock, formBuilder);

        (<FormControl>component.signupForm.controls['email']).setValue("test@test.com");
        
        tick(500);

        expect(component.email.valid).toBe(true);
        expect(component.email.errors).toBe(null);
      })
    ))

    it('should mark email invalid if it exists',
      inject([FormBuilder], fakeAsync((formBuilder: FormBuilder) => {
        let mock: UserService = td.object(UserService);
        td.when(mock.exists(td.matchers.anything()))
          .thenReturn(new Rx.Observable<boolean>((observer: Rx.Subscriber<boolean>) => {
            observer.next(true);
          }))
        let component = new SignupComponent(mock, formBuilder);

        (<FormControl>component.signupForm.controls['email']).setValue("test@test.com");
        
        tick(500);

        expect(component.email.valid).toBe(false);
        expect(component.email.errors['nameTaken']).toBe(true);
      })
    ))

  })

});
