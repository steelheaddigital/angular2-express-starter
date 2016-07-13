import 'zone.js';
import 'reflect-metadata';
import { APP_BASE_HREF } from '@angular/common';
import { enableProdMode, provide } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { HTTP_PROVIDERS, Http } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { APP_ROUTER_PROVIDERS } from './app.routes';
import { AppComponent } from './app.component';

bootstrap(AppComponent, [
  APP_ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  provide(AuthHttp, {
    useFactory: (http) => {
      return new AuthHttp(new AuthConfig({
        headerName: 'Authorization',
        headerPrefix: 'Bearer',
        tokenName: 'auth_token',
        tokenGetter: (() => localStorage.getItem(this.tokenName)),
        noJwtError: false,
        noTokenScheme: false
      }), http);
    },
    deps: [Http]
  }),
  disableDeprecatedForms(),
  provideForms()
]);