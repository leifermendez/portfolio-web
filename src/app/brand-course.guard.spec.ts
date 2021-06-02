import { TestBed } from '@angular/core/testing';

import { BrandCourseGuard } from './brand-course.guard';

describe('BrandCourseGuard', () => {
  let guard: BrandCourseGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BrandCourseGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
