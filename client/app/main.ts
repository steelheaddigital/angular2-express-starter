import 'zone.js';
import 'reflect-metadata';
import { APP_BASE_HREF } from '@angular/common';
import { enableProdMode, provide } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { AppComponent } from './app.component';

bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  AUTH_PROVIDERS,
  provide(APP_BASE_HREF, { useValue: '/' })
]);