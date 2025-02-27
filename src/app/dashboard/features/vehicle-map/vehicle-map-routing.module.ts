import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleMapComponent } from './components/vehicle-map.component';

const routes: Routes = [{ path: '', component: VehicleMapComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleMapRoutingModule { }
