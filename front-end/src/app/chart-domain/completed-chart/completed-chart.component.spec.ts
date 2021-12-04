import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedChartComponent } from './completed-chart.component';

describe('CompletedChartComponent', () => {
  let component: CompletedChartComponent;
  let fixture: ComponentFixture<CompletedChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
