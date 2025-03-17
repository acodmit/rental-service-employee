// shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Import Material modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import { HomeComponent } from './home/home.component';
import {MatCard} from '@angular/material/card';
import {RouterLink} from '@angular/router';
import { AccountComponent } from './account/account.component';
import {MatDivider} from '@angular/material/divider';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatTooltip} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ConfirmDialogComponent,
    HomeComponent,
    AccountComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule, // Add Material modules
    MatButtonModule,
    MatIconModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatCard,
    RouterLink,
    MatDivider,
    MatProgressSpinner,
    MatTooltip,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ConfirmDialogComponent,
    // MatToolbarModule, // Add Material modules
    // MatButtonModule,
    // MatIconModule,
  ],
})
export class SharedModule {}


