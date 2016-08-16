/* tslint:disable:no-unused-variable */

import { describe, beforeEach, it, expect, addProviders, async, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { MockBackend } from '@angular/http/testing';
import { Headers, HTTP_PROVIDERS, BaseRequestOptions, XHRBackend, Response } from '@angular/http';
import { provide } from '@angular/core';

describe('Service: Auth', () => {
  beforeEach(() => {
    addProviders([
      AuthService,
      HTTP_PROVIDERS,
      provide(XHRBackend, {useClass: MockBackend}),
    ]);
  });

  it('should ...',
    inject([AuthService],
      (service: AuthService) => {
        expect(service).toBeTruthy();
      }));
});
