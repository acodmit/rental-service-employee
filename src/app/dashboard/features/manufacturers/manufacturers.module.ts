import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManufacturersRoutingModule } from './manufacturers-routing.module';
import { ManufacturerManagementComponent } from './components/manufacturer-management/manufacturer-management.component';


@NgModule({
  declarations: [
    ManufacturerManagementComponent
  ],
  imports: [
    CommonModule,
    ManufacturersRoutingModule
  ]
})
export class ManufacturersModule { }
