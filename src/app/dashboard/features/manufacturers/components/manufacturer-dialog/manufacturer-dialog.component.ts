import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Manufacturer } from '../../../../../core/models/manufacturer.model';
import { ManufacturerService } from '../../../../../core/services/manufacturer.service';

@Component({
  selector: 'app-manufacturer-dialog',
  standalone: false,
  templateUrl: './manufacturer-dialog.component.html',
  styleUrls: ['./manufacturer-dialog.component.css'],
})
export class ManufacturerDialogComponent {
  manufacturer: Manufacturer = {
    id: 0,
    name: '',
    country: '',
    address: '',
    phoneNumber: '',
    fax: '',
    email: '',
  };

  constructor(
    private dialogRef: MatDialogRef<ManufacturerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mode: 'add' | 'edit'; manufacturer?: Manufacturer },
    private manufacturerService: ManufacturerService
  ) {
    if (data.mode === 'edit' && data.manufacturer) {
      this.manufacturer = { ...data.manufacturer };
    }
  }

  onSubmit(): void {
    if (this.data.mode === 'add') {
      this.manufacturerService.addManufacturer(this.manufacturer).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else if (this.data.mode === 'edit') {
      this.manufacturerService.updateManufacturer(this.manufacturer.id, this.manufacturer).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
