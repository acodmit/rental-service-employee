// shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar'; // Import Material modules
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule, // Add Material modules
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    // MatToolbarModule, // Add Material modules
    // MatButtonModule,
    // MatIconModule,
  ],
})
export class SharedModule {}


