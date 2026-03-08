import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataVisualization } from './data-visualization';

describe('DataVisualization', () => {
  let component: DataVisualization;
  let fixture: ComponentFixture<DataVisualization>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataVisualization]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataVisualization);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
