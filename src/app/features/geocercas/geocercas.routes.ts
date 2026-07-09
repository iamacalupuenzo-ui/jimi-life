import { Routes } from '@angular/router'

export const GEOFENCES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/geocercas-page/geocercas-page.component').then(
        (m) => m.GeocercasPageComponent,
      ),
  },
  {
    path: 'nueva',
    loadComponent: () =>
      import('./pages/geocerca-form/geocerca-form.component').then(
        (m) => m.GeocercaFormComponent,
      ),
  },
]
