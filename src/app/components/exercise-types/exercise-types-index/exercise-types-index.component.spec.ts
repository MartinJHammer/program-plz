import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseTypesIndexComponent } from './exercise-types-index.component';

describe('ExerciseTypesIndexComponent', () => {
  let component: ExerciseTypesIndexComponent;
  let fixture: ComponentFixture<ExerciseTypesIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseTypesIndexComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseTypesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
