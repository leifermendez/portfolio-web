import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CTAModalComponent } from './ctamodal.component';

describe('CTAModalComponent', () => {
  let component: CTAModalComponent;
  let fixture: ComponentFixture<CTAModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CTAModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CTAModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
