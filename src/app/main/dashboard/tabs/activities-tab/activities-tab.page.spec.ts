import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesTabPage } from './activities-tab.page';

describe('ActivitiesTabPage', () => {
  let component: ActivitiesTabPage;
  let fixture: ComponentFixture<ActivitiesTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitiesTabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
