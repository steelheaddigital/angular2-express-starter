import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Routes } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { NavbarComponent } from './shared/navbar/index';
import { HomeComponent } from './home/index';
import { SignupComponent } from './user/signup/index';
import { LoginComponent } from './auth/login/index';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    viewProviders: [HTTP_PROVIDERS],
    directives: [ROUTER_DIRECTIVES, NavbarComponent, LoginComponent]
})
@Routes([
  {
    path: '/',
    component: HomeComponent
  },
  {
    path: '/home',
    component: HomeComponent
  },
  {
    path: '/signup',
    component: SignupComponent
  },
  {
    path: '/login',
    component: LoginComponent
  }
])
export class AppComponent { }