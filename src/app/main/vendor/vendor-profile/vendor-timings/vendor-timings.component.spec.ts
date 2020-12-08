import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorTimingsComponent } from './vendor-timings.component';

describe('VendorTimingsComponent', () => {
  let component: VendorTimingsComponent;
  let fixture: ComponentFixture<VendorTimingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorTimingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorTimingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
