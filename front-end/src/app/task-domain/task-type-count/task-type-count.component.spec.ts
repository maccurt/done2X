import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTypeCountComponent } from './task-type-count.component';

describe('TaskTypeCountComponent', () => {
  let component: TaskTypeCountComponent;
  let fixture: ComponentFixture<TaskTypeCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskTypeCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskTypeCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
