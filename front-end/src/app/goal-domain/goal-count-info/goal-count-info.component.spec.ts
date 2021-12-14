import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalCountInfoComponent } from './goal-count-info.component';

describe('GoalCountInfoComponent', () => {
  let component: GoalCountInfoComponent;
  let fixture: ComponentFixture<GoalCountInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalCountInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalCountInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
