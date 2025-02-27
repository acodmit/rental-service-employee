import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors} from '@angular/common/http';
import { errorInterceptor } from './interceptors/error.interceptor';
//import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideHttpClient(withInterceptors([ errorInterceptor])),
    //{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class CoreModule {}
