import { TestBed } from '@angular/core/testing';

import { SsrOriginInterceptor } from './ssr-origin.interceptor';

describe('SsrOriginInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SsrOriginInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SsrOriginInterceptor = TestBed.inject(SsrOriginInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
