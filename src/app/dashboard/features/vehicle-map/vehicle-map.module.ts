import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleMapRoutingModule } from './vehicle-map-routing.module';
import { VehicleMapComponent } from './components/vehicle-map.component';


@NgModule({
  declarations: [
    VehicleMapComponent
  ],
  imports: [
    CommonModule,
    VehicleMapRoutingModule
  ]
})
export class VehicleMapModule { }
