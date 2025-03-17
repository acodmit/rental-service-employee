// vehicles.module.ts
import { NgModule } from '@angular/core';
import {CommonModule, NgClass} from '@angular/common';
import { VehicleManagementComponent } from './components/vehicle-management/vehicle-management.component';
import { VehicleDetailsComponent } from './components/vehicle-details/vehicle-details.component';
import { VehicleFormDialogComponent } from './components/vehicle-management/vehicle-form-dialog/vehicle-form-dialog.component';
import { VehiclesRoutingModule } from './vehicles-routing.module';

// Angular Material Modules
import { MatTabsModule } from '@angular/material/tabs';
import {MatCard, MatCardContent, MatCardHeader, MatCardModule} from '@angular/material/card';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableModule
} from '@angular/material/table';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import {MatInput, MatInputModule} from '@angular/material/input';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatList, MatListItem} from '@angular/material/list';
import {MatLine} from '@angular/material/core';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { AddFaultDialogComponent } from './components/vehicle-details/add-fault-dialog/add-fault-dialog.component';
import {MatPaginator} from '@angular/material/paginator';

@NgModule({
  declarations: [
    VehicleManagementComponent,
    VehicleDetailsComponent,
    VehicleListComponent
  ],
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    AddFaultDialogComponent,
    VehicleFormDialogComponent,
    NgClass,
    // Forms
    FormsModule,
    ReactiveFormsModule,
    // Angular Material Modules
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginator,
    MatList,
    MatListItem,
    MatLine,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatInput,
    MatIcon,
    MatTable,
    MatFormField,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatButton,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
  ]
})
export class VehiclesModule {}
