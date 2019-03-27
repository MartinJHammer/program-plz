import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseTypesEditComponent } from './exercise-types-edit.component';

describe('ExerciseTypesEditComponent', () => {
  let component: ExerciseTypesEditComponent;
  let fixture: ComponentFixture<ExerciseTypesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseTypesEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseTypesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
