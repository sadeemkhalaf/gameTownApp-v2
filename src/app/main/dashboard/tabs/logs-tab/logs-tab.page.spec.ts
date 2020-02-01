import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsTabPage } from './logs-tab.page';

describe('LogsTabPage', () => {
  let component: LogsTabPage;
  let fixture: ComponentFixture<LogsTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogsTabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogsTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
