import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrintComponent } from './add-print.component';

describe('AddPrintComponent', () => {
  let component: AddPrintComponent;
  let fixture: ComponentFixture<AddPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
