import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PricingRoutingModule } from './pricing-routing.module';
import { PricingComponent } from './components/pricing/pricing.component';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatList, MatListItem} from '@angular/material/list';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    PricingComponent
  ],
  imports: [
    CommonModule,
    PricingRoutingModule,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatProgressSpinner,
    MatList,
    MatListItem,
    MatFormField,
    MatInput,
    FormsModule,
    MatLabel,
    MatCardTitle,
    MatCardSubtitle
  ]
})
export class PricingModule { }
