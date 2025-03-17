import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManufacturerManagementComponent } from './components/manufacturer-management/manufacturer-management.component';
import { ManufacturerDialogComponent } from './components/manufacturer-dialog/manufacturer-dialog.component';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
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
import {MatPaginator} from '@angular/material/paginator';
import {MatDialogActions, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {SharedModule} from '../../../shared/shared.module';
import {ManufacturerRoutingModule} from './manufacturers-routing.module';


@NgModule({
  declarations: [
    ManufacturerManagementComponent,
    ManufacturerDialogComponent
  ],
  imports: [
    CommonModule,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatFormField,
    MatInput,
    FormsModule,
    MatIcon,
    MatButton,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatColumnDef,
    MatHeaderCellDef,
    MatCellDef,
    MatIconButton,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatPaginator,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatLabel,
    MatCardTitle,
    MatCardSubtitle,
    SharedModule,
    ManufacturerRoutingModule
  ]
})
export class ManufacturersModule { }
