import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { RoleGuard } from '../core/guards/role.guard';
import {HomeComponent} from '../shared/home/home.component';
import {AccountComponent} from '../shared/account/account.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '', // Default child route for /dashboard
        component: HomeComponent, // Display HomeComponent by default
      },
      {
        path: 'account', // Route for the AccountComponent
        component: AccountComponent,
      },
      {
        path: 'vehicles',
        loadChildren: () => import('./features/vehicles/vehicles.module').then(m => m.VehiclesModule),
        canActivate: [RoleGuard],
        data: { role: ['ADMIN', 'MANAGER'] }, // Allow ADMIN and MANAGER
      },
      {
        path: 'manufacturers',
        loadChildren: () => import('./features/manufacturers/manufacturers.module').then(m => m.ManufacturersModule),
        canActivate: [RoleGuard],
        data: { role: ['ADMIN', 'MANAGER'] }, // Allow ADMIN and MANAGER
      },
      {
        path: 'users',
        loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule),
        canActivate: [RoleGuard],
        data: { role: ['ADMIN', 'MANAGER'] }, // Allow ADMIN and MANAGER
      },
      {
        path: 'rentals',
        loadChildren: () => import('./features/rentals/rentals.module').then(m => m.RentalsModule),
        canActivate: [RoleGuard],
        data: { role: ['OPERATOR', 'MANAGER'] }, // Allow OPERATOR and MANAGER
      },
      {
        path: 'clients',
        loadChildren: () => import('./features/clients/clients.module').then(m => m.ClientsModule),
        canActivate: [RoleGuard],
        data: { role: ['OPERATOR', 'MANAGER'] }, // Allow OPERATOR and MANAGER
      },
      {
        path: 'faults',
        loadChildren: () => import('./features/faults/faults.module').then(m => m.FaultsModule),
        canActivate: [RoleGuard],
        data: { role: ['OPERATOR', 'MANAGER'] }, // Allow OPERATOR and MANAGER
      },
      {
        path: 'vehicle-map',
        loadChildren: () => import('./features/vehicle-map/vehicle-map.module').then(m => m.VehicleMapModule),
        canActivate: [RoleGuard],
        data: { role: ['OPERATOR', 'MANAGER'] }, // Allow OPERATOR and MANAGER
      },
      {
        path: 'statistics',
        loadChildren: () => import('./features/statistics/statistics.module').then(m => m.StatisticsModule),
        canActivate: [RoleGuard],
        data: { role: ['MANAGER'] }, // Allow only MANAGER
      },
      {
        path: 'pricing',
        loadChildren: () => import('./features/pricing/pricing.module').then(m => m.PricingModule),
        canActivate: [RoleGuard],
        data: { role: ['MANAGER'] }, // Allow only MANAGER
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
