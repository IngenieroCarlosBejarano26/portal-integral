import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'facturacion' },  
  { path: 'facturacion', loadChildren: () => import('./features/facturacion/facturacion.routes').then((m) => m.FACTURACION_ROUTES)},
  { path: 'certicamara', loadChildren: () => import('./features/certicamara/certicamara.routes').then((m) => m.CERTICAMARA_ROUTES)},
];
