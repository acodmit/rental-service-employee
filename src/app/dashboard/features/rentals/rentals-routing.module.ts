import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { RentalOverviewComponent } from './components/rental-overview/rental-overview.component';

const routes: Routes = [
  {
    path: '',
    component: RentalOverviewComponent,
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentalsRoutingModule {
}
