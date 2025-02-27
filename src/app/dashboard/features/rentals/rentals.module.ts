import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RentalsRoutingModule } from './rentals-routing.module';
import { RentalOverviewComponent } from './components/rental-overview/rental-overview.component';

@NgModule({
  declarations: [
    RentalOverviewComponent,
  ],
  imports: [
    CommonModule,
    RentalsRoutingModule
  ]
})
export class RentalsModule { }
