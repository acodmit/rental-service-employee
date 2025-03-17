import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaultsRoutingModule } from './faults-routing.module';
import { FaultReportingComponent } from './components/fault-reporting/fault-reporting.component';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatButton, MatIconButton} from '@angular/material/button';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatIcon} from '@angular/material/icon';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import { AddFaultDialogComponent } from './components/add-fault-dialog/add-fault-dialog.component';
import {MatDialogActions, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatInput} from '@angular/material/input';


@NgModule({
  declarations: [
    FaultReportingComponent,
    AddFaultDialogComponent
  ],
  imports: [
    CommonModule,
    FaultsRoutingModule,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatButton,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCellDef,
    MatCell,
    MatIcon,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatIconButton,
    MatLabel,
    MatCardTitle,
    MatCardSubtitle,
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatInput,
    MatDialogActions,
    MatError
  ]
})
export class FaultsModule { }
