import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitTestRunComponent } from './init-test-run.component';

describe('InitTestRunComponent', () => {
  let component: InitTestRunComponent;
  let fixture: ComponentFixture<InitTestRunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitTestRunComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitTestRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
