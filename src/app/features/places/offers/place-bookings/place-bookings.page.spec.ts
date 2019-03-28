import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceBookingsPage } from './place-bookings.page';

describe('PlaceBookingsPage', () => {
  let component: PlaceBookingsPage;
  let fixture: ComponentFixture<PlaceBookingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceBookingsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceBookingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
