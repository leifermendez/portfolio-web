import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathRouteComponent } from './path-route.component';

describe('PathRouteComponent', () => {
  let component: PathRouteComponent;
  let fixture: ComponentFixture<PathRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PathRouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PathRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
