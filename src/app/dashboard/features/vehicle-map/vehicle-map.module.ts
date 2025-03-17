import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleMapRoutingModule } from './vehicle-map-routing.module';
import { VehicleMapComponent } from './components/vehicle-map.component';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';


@NgModule({
  declarations: [
    VehicleMapComponent
  ],
  imports: [
    CommonModule,
    VehicleMapRoutingModule,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatCardSubtitle
  ]
})
export class VehicleMapModule { }
