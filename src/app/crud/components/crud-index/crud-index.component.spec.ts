import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudIndexComponent } from './crud-index.component';

describe('CrudIndexComponent', () => {
  let component: CrudIndexComponent;
  let fixture: ComponentFixture<CrudIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
