import { ApplicationConfig, provideZoneChangeDetection, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptor, errorInterceptor, loggingInterceptor } from './interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    // provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(
      routes, 
      withComponentInputBinding(), 
      withRouterConfig({defaultQueryParamsHandling: "replace"}),
    ),
    provideHttpClient(
      withInterceptors([loggingInterceptor,errorInterceptor,authInterceptor])),
  ]
};
