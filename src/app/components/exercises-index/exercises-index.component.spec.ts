import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseIndexComponent } from './exercises-index.component';

describe('ExerciseIndexComponent', () => {
  let component: ExerciseIndexComponent;
  let fixture: ComponentFixture<ExerciseIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseIndexComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
