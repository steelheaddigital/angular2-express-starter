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
import { SignupComponent } from './signup.component';
import { UserService } from '../user.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import * as Rx from 'rxjs/Rx';
import * as Mockito from 'ts-mockito';

describe('Component: Signup', () => {

  let fixture: ComponentFixture<SignupComponent>;
  let component: SignupComponent;
  let mockService: UserService;

  beforeEach(async(() => {
    mockService = Mockito.mock(UserService);
    TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports:[ ReactiveFormsModule ],
      providers: [
        FormBuilder
      ]
    })
    .overrideComponent(SignupComponent, {
      set: {
        providers: [
          { provide: UserService, useValue: Mockito.instance(mockService) }
        ]
      }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
  })

  it('should inject SignupComponent and build form', () => {
      expect(component).toBeTruthy();
      expect(component.name instanceof FormControl).toBe(true);
      expect(component.email instanceof FormControl).toBe(true);
      expect(component.password instanceof FormControl).toBe(true);
      expect(component.signupForm instanceof FormGroup).toBe(true);
      expect(component.signupForm.contains('name')).toBe(true);
      expect(component.signupForm.contains('email')).toBe(true);
      expect(component.signupForm.contains('password')).toBe(true);
  });

  describe('signup method', () => {
    it('should signup user and reset form on success', fakeAsync(() => {
      Mockito.when(mockService.create("test", "test@test.com", "12345"))
        .thenReturn(new Rx.Observable<boolean>((observer: Rx.Subscriber<boolean>) => {
          observer.next(true);
        }))
      Mockito.when(mockService.exists(Mockito.anything()))
        .thenReturn(new Rx.Observable<boolean>((observer: Rx.Subscriber<boolean>) => {
          observer.next(true);
        }));
      
      component.name.setValue("test");
      component.email.setValue("test@test.com");
      component.password.setValue("12345");
      component.signup();

      tick(500)

      expect(component.email.value).toBe("");
      expect(component.name.value).toBe("");
      expect(component.password.value).toBe("");
    }))

    it('should not reset form if signup fails', fakeAsync(() => {
      Mockito.when(mockService.create("test", "test@test.com", "12345"))
        .thenReturn(new Rx.Observable<boolean>((observer: Rx.Subscriber<boolean>) => {
          observer.next(false);
        }))
      Mockito.when(mockService.exists(Mockito.anything()))
        .thenReturn(new Rx.Observable<boolean>((observer: Rx.Subscriber<boolean>) => {
          observer.next(true);
        }));

      component.name.setValue("test");
      component.email.setValue("test@test.com");
      component.password.setValue("12345");
      component.signup()

      tick(500);

      expect(component.name.value).toBe("test");
      expect(component.email.value).toBe("test@test.com");
      expect(component.password.value).toBe("12345");
    }))
  })

  describe('Validations', () => {
    it('should not mark name invalid if it does not exist', fakeAsync(() => {
      Mockito.when(mockService.exists(Mockito.anything()))
        .thenReturn(new Rx.Observable<boolean>((observer: Rx.Subscriber<boolean>) => {
          observer.next(false);
        }));

      (<FormControl>component.signupForm.controls['name']).setValue("test");
      
      tick(500);

      expect(component.name.valid).toBe(true);
      expect(component.name.errors).toBe(null);
    }))

    it('should mark name invalid if it exists',fakeAsync(() => {
      Mockito.when(mockService.exists(Mockito.anything()))
        .thenReturn(new Rx.Observable<boolean>((observer: Rx.Subscriber<boolean>) => {
          observer.next(true);
        }));

      (<FormControl>component.signupForm.controls['name']).setValue("test");
      

      tick(500);

      expect(component.name.valid).toBe(false);
      expect(component.name.errors['nameTaken']).toBe(true);
    }))

    it('should not mark email invalid if it does not exist', fakeAsync(() => {
      Mockito.when(mockService.exists(Mockito.anything()))
        .thenReturn(new Rx.Observable<boolean>((observer: Rx.Subscriber<boolean>) => {
          observer.next(false);
        }));

      (<FormControl>component.signupForm.controls['email']).setValue("test@test.com");
      
      tick(500);

      expect(component.email.valid).toBe(true);
      expect(component.email.errors).toBe(null);
    }))

    it('should mark email invalid if it exists', fakeAsync(() => {
      Mockito.when(mockService.exists(Mockito.anything()))
        .thenReturn(new Rx.Observable<boolean>((observer: Rx.Subscriber<boolean>) => {
          observer.next(true);
        }));

      (<FormControl>component.signupForm.controls['email']).setValue("test@test.com");

      tick(500);

      expect(component.email.valid).toBe(false);
      expect(component.email.errors['nameTaken']).toBe(true);
    }))
  })

});
