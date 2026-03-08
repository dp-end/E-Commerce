import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalConfig } from './global-config';

describe('GlobalConfig', () => {
  let component: GlobalConfig;
  let fixture: ComponentFixture<GlobalConfig>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalConfig]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalConfig);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
