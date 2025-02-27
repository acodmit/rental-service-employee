import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaultReportingComponent } from './fault-reporting.component';

describe('FaultReportingComponent', () => {
  let component: FaultReportingComponent;
  let fixture: ComponentFixture<FaultReportingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FaultReportingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaultReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
