/* tslint:disable:no-unused-variable */
/// <reference path="../../../../typings/globals/jasmine/index.d.ts" />

import { TestBed,
    inject,
    fakeAsync,
    tick,
    async
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provide } from '@angular/core';
import { SignupComponent } from './signup.component';
import { UserService } from '../user.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as Rx from 'rxjs/Rx';
import * as TypeMoq from "typemoq";

describe('Component: Signup', () => {

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      FormBuilder
    ]
  }));

  it('should inject SignupComponent and build form',
    inject([FormBuilder],(formBuilder: FormBuilder) => {
      let mockService: TypeMoq.Mock<UserService> = TypeMoq.Mock.ofType(UserService);
      let component = new SignupComponent(mockService.object, formBuilder)

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
        let mock: TypeMoq.Mock<UserService> = TypeMoq.Mock.ofType(UserService);
        mock.setup(x => x.create("test", "test@test.com", "12345"))
          .returns(() => { return new Rx.Observable<boolean>((observer: Rx.Subscriber<boolean>) => {
              observer.next(true);
            });
          })

        let component = new SignupComponent(mock.object, formBuilder);
        component.name.updateValue("test");
        component.email.updateValue("test@test.com");
        component.password.updateValue("12345");

        component.signup()

        mock.verify(x => x.create("test", "test@test.com", "12345"), TypeMoq.Times.atLeastOnce());
        expect(component.email.value).toBe("");
        expect(component.name.value).toBe("");
        expect(component.password.value).toBe("");
      })
    )

    it('should not reset form if signup fails',
      inject([FormBuilder], (formBuilder: FormBuilder) => {
        let mock: TypeMoq.Mock<UserService> = TypeMoq.Mock.ofType(UserService);
        mock.setup(x => x.create("test", "test@test.com", "12345"))
          .returns(() => { return new Rx.Observable<boolean>((observer: Rx.Subscriber<boolean>) => {
              observer.next(false);
            });
          })

        let component = new SignupComponent(mock.object, formBuilder);
        component.name.updateValue("test");
        component.email.updateValue("test@test.com");
        component.password.updateValue("12345");

        component.signup()

        mock.verify(x => x.create("test", "test@test.com", "12345"), TypeMoq.Times.atLeastOnce());
        expect(component.name.value).toBe("test");
        expect(component.email.value).toBe("test@test.com");
        expect(component.password.value).toBe("12345");
      })
    )
  })

  describe('Validations', () => {
    it('should not mark name invalid if it does not exist',
      inject([FormBuilder], fakeAsync((formBuilder: FormBuilder) => {
        let mock: TypeMoq.Mock<UserService> = TypeMoq.Mock.ofType(UserService);
        mock.setup(x => x.exists(TypeMoq.It.isAny()))
          .returns(() => { return new Rx.Observable<boolean>((observer: Rx.Subscriber<boolean>) => {
              observer.next(false);
            });
          })
        let component = new SignupComponent(mock.object, formBuilder);

        (<FormControl>component.signupForm.controls['name']).updateValue("test");
        
        tick(500);

        expect(component.name.valid).toBe(true);
        expect(component.name.errors).toBe(null);
      })
    ))

    it('should mark name invalid if it exists',
      inject([FormBuilder], fakeAsync((formBuilder: FormBuilder) => {
        let mock: TypeMoq.Mock<UserService> = TypeMoq.Mock.ofType(UserService);
        mock.setup(x => x.exists(TypeMoq.It.isAny()))
          .returns(() => { return new Rx.Observable<boolean>((observer: Rx.Subscriber<boolean>) => {
              observer.next(true);
            });
          })
        let component = new SignupComponent(mock.object, formBuilder);

        (<FormControl>component.signupForm.controls['name']).updateValue("test");
        
        tick(500);

        expect(component.name.valid).toBe(false);
        expect(component.name.errors['nameTaken']).toBe(true);
      })
    ))

    it('should not mark email invalid if it does not exist',
      inject([FormBuilder], fakeAsync((formBuilder: FormBuilder) => {
        let mock: TypeMoq.Mock<UserService> = TypeMoq.Mock.ofType(UserService);
        mock.setup(x => x.exists(TypeMoq.It.isAny()))
          .returns(() => { return new Rx.Observable<boolean>((observer: Rx.Subscriber<boolean>) => {
              observer.next(false);
            });
          })
        let component = new SignupComponent(mock.object, formBuilder);

        (<FormControl>component.signupForm.controls['email']).updateValue("test@test.com");
        
        tick(500);

        expect(component.email.valid).toBe(true);
        expect(component.email.errors).toBe(null);
      })
    ))

    it('should mark email invalid if it exists',
      inject([FormBuilder], fakeAsync((formBuilder: FormBuilder) => {
        let mock: TypeMoq.Mock<UserService> = TypeMoq.Mock.ofType(UserService);
        mock.setup(x => x.exists(TypeMoq.It.isAny()))
          .returns(() => { return new Rx.Observable<boolean>((observer: Rx.Subscriber<boolean>) => {
              observer.next(true);
            });
          })
        let component = new SignupComponent(mock.object, formBuilder);

        (<FormControl>component.signupForm.controls['email']).updateValue("test@test.com");
        
        tick(500);

        expect(component.email.valid).toBe(false);
        expect(component.email.errors['nameTaken']).toBe(true);
      })
    ))

  })

});
