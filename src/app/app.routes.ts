import { Routes } from '@angular/router'

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'splash',
    loadChildren: () => import('./features/splash/splash.routes').then((m) => m.SPLASH_ROUTES),
  },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.routes').then((m) => m.HOME_ROUTES),
  },
  {
    path: 'perfil',
    loadChildren: () => import('./features/perfil/perfil.routes').then((m) => m.PERFIL_ROUTES),
  },
  {
    path: 'dispositivo',
    loadChildren: () =>
      import('./features/dispositivo/dispositivo.routes').then((m) => m.DISPOSITIVO_ROUTES),
  },
  {
    path: 'agregar-dispositivo',
    loadChildren: () =>
      import('./features/agregar-dispositivo/agregar-dispositivo.routes').then(
        (m) => m.AGREGAR_DISPOSITIVO_ROUTES,
      ),
  },
  {
    path: 'geocercas',
    loadChildren: () =>
      import('./features/geocercas/geocercas.routes').then((m) => m.GEOFENCES_ROUTES),
  },
  { path: '**', redirectTo: 'home' },
]
