import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsComponent } from './components/statistics/statistics.component';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {BaseChartDirective} from 'ng2-charts';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    StatisticsComponent
  ],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    MatCard,
    MatCardHeader,
    MatCardContent,
    BaseChartDirective,
    MatCardTitle,
    MatCardSubtitle,
    MatFormField,
    MatInput,
    FormsModule,
    MatLabel
  ]
})
export class StatisticsModule { }
