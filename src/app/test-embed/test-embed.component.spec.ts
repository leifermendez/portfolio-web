import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestEmbedComponent } from './test-embed.component';

describe('TestEmbedComponent', () => {
  let component: TestEmbedComponent;
  let fixture: ComponentFixture<TestEmbedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestEmbedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestEmbedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
