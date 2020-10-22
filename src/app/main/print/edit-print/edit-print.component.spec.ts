import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPrintComponent } from './edit-print.component';

describe('EditPrintComponent', () => {
  let component: EditPrintComponent;
  let fixture: ComponentFixture<EditPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
