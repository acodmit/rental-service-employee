// vehicles-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleManagementComponent } from './components/vehicle-management/vehicle-management.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { VehicleDetailsComponent} from './components/vehicle-details/vehicle-details.component';

const routes: Routes = [
  {
    path: 'vehicle-management', // Default route for /dashboard/vehicles
    component: VehicleManagementComponent,
  },
  {
    path: 'vehicle-list',
    component: VehicleListComponent,
  },
  {
    path: 'vehicle-details/:vehicleType/:vehicleId',
    component: VehicleDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule], // Export RouterModule
})
export class VehiclesRoutingModule {}
