import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityReceiptPage } from './activity-receipt.page';

describe('ActivityReceiptPage', () => {
  let component: ActivityReceiptPage;
  let fixture: ComponentFixture<ActivityReceiptPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityReceiptPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityReceiptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
