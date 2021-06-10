import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallbackSocialComponent } from './callback-social.component';

describe('CallbackSocialComponent', () => {
  let component: CallbackSocialComponent;
  let fixture: ComponentFixture<CallbackSocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallbackSocialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallbackSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
