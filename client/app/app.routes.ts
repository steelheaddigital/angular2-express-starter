import { provideRouter, RouterConfig } from '@angular/router';
import { HomeComponent } from './home/index';
import { SignupComponent } from './user/signup/index';
import { LoginComponent } from './auth/login/index';

export const routes: RouterConfig = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];