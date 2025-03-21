import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturerDialogComponent } from './manufacturer-dialog.component';

describe('ManufacturerDialogComponent', () => {
  let component: ManufacturerDialogComponent;
  let fixture: ComponentFixture<ManufacturerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManufacturerDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManufacturerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
