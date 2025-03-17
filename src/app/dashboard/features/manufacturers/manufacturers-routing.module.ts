import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManufacturerManagementComponent } from './components/manufacturer-management/manufacturer-management.component';

const routes: Routes = [
  {
    path: 'manufacturer-management', // Default route for /dashboard/manufacturers
    component: ManufacturerManagementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule], // Export RouterModule
})
export class ManufacturerRoutingModule {}
