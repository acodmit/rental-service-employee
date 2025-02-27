// vehicles-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleManagementComponent } from './components/vehicle-management/vehicle-management.component';

const routes: Routes = [
  {
    path: '', // Default route for /dashboard/vehicles
    component: VehicleManagementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule], // Export RouterModule
})
export class VehiclesRoutingModule {}
