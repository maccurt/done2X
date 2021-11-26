import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPriorityChartV1Component } from './task-priority-chart-v1.component';

describe('TaskPriorityChartV1Component', () => {
  let component: TaskPriorityChartV1Component;
  let fixture: ComponentFixture<TaskPriorityChartV1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskPriorityChartV1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskPriorityChartV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
