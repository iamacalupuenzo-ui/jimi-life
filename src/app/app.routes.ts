import { Routes } from '@angular/router'

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.routes').then((m) => m.HOME_ROUTES),
  },
  {
    path: 'perfil',
    loadChildren: () => import('./features/perfil/perfil.routes').then((m) => m.PERFIL_ROUTES),
  },
  { path: '**', redirectTo: 'home' },
]
