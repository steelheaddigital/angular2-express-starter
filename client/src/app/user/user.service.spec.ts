/* tslint:disable:no-unused-variable */

import { describe, beforeEach, it, expect, addProviders, async, inject } from '@angular/core/testing';
import { UserService } from './user.service';
import { MockBackend } from '@angular/http/testing';
import { Headers, HTTP_PROVIDERS, BaseRequestOptions, XHRBackend, Response } from '@angular/http';
import { provide } from '@angular/core';

describe('Service: User', () => {
  beforeEach(() => {
    addProviders([
      UserService,
      HTTP_PROVIDERS,
      provide(XHRBackend, {useClass: MockBackend}),
    ]);
  });

  it('should ...',
    inject([UserService],
      (service: UserService) => {
        expect(service).toBeTruthy();
      }));
});
