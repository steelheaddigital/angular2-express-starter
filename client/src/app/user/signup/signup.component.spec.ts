/* tslint:disable:no-unused-variable */

import { beforeEach,
    addProviders,
    describe,
    expect,
    inject,
    fakeAsync,
    tick,
    it, 
    afterEach, 
    async
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, provide } from '@angular/core';
import { SignupComponent } from './signup.component';
import { UserService } from '../user.service';
import { REACTIVE_FORM_DIRECTIVES, FORM_DIRECTIVES, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as Rx from 'rxjs/Rx';
import * as TypeMoq from "typemoq";

describe('Component: Signup', () => {

  beforeEach(() => addProviders([
    FormBuilder
  ]));

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

    it('should mark name invalid if name exists',
      inject([FormBuilder], (formBuilder: FormBuilder) => {
        let mock: TypeMoq.Mock<UserService> = TypeMoq.Mock.ofType(UserService);
        mock.setup(x => x.exists(TypeMoq.It.isAny()))
          .returns(() => { return new Rx.Observable<boolean>((observer: Rx.Subscriber<boolean>) => {
              observer.next(false);
            });
          })
        let component = new SignupComponent(mock.object, formBuilder);

        (<FormControl>component.signupForm.controls['name']).updateValue("test");

        expect((<FormControl>component.signupForm.controls['name']).errors).toBe(null);
      })
    )

  })

});
