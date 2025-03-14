// vehicles.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleManagementComponent } from './components/vehicle-management/vehicle-management.component';
import { VehicleDetailsComponent } from './components/vehicle-details/vehicle-details.component';
import { VehicleFormDialogComponent } from './components/vehicle-management/vehicle-form-dialog/vehicle-form-dialog.component';
import { VehiclesRoutingModule } from './vehicles-routing.module';

// Angular Material Modules
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatList, MatListItem} from '@angular/material/list';
import {MatLine} from '@angular/material/core';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { AddFaultDialogComponent } from './components/vehicle-details/add-fault-dialog/add-fault-dialog.component';

@NgModule({
  declarations: [
    VehicleManagementComponent,
    VehicleDetailsComponent,
    VehicleListComponent
  ],
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    // Angular Material Modules
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    // Forms
    FormsModule,
    ReactiveFormsModule,
    MatList,
    MatListItem,
    MatLine,
    AddFaultDialogComponent,
    VehicleFormDialogComponent,
  ],
})
export class VehiclesModule {}
