import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FaultReportingComponent} from './components/fault-reporting/fault-reporting.component';

const routes: Routes = [
  {
    path: '',
    component: FaultReportingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaultsRoutingModule { }
