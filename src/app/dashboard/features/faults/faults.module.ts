import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaultsRoutingModule } from './faults-routing.module';
import { FaultReportingComponent } from './components/fault-reporting/fault-reporting.component';


@NgModule({
  declarations: [
    FaultReportingComponent
  ],
  imports: [
    CommonModule,
    FaultsRoutingModule
  ]
})
export class FaultsModule { }
