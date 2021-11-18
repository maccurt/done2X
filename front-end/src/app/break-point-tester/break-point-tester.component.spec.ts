import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakPointTesterComponent } from './break-point-tester.component';

describe('BreakPointTesterComponent', () => {
  let component: BreakPointTesterComponent;
  let fixture: ComponentFixture<BreakPointTesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreakPointTesterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakPointTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
