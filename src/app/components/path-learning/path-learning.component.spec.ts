import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathLearningComponent } from './path-learning.component';

describe('PathLearningComponent', () => {
  let component: PathLearningComponent;
  let fixture: ComponentFixture<PathLearningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PathLearningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PathLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
