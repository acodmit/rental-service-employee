// dashboard.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {SharedModule} from "../shared/shared.module";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import { RouterModule } from '@angular/router';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {MatIcon} from '@angular/material/icon';

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    RouterModule,
    DashboardRoutingModule,
    MatIcon
  ]
})
export class DashboardModule { }


