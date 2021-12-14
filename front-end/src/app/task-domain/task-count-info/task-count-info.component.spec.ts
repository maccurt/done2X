import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCountInfoComponent } from './task-count-info.component';

describe('TaskCountInfoComponent', () => {
  let component: TaskCountInfoComponent;
  let fixture: ComponentFixture<TaskCountInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskCountInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCountInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
