import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseTypesCreateComponent } from './exercise-types-create.component';

describe('ExerciseTypesCreateComponent', () => {
  let component: ExerciseTypesCreateComponent;
  let fixture: ComponentFixture<ExerciseTypesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseTypesCreateComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseTypesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
