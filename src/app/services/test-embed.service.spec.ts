import { TestBed } from '@angular/core/testing';

import { TestEmbedService } from './test-embed.service';

describe('TestEmbedService', () => {
  let service: TestEmbedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestEmbedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
