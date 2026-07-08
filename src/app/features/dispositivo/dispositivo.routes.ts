import { Routes } from '@angular/router'
import { DispositivoDetailComponent } from './pages/dispositivo-detail/dispositivo-detail.component'
import { DispositivoPageComponent } from './pages/dispositivo-page/dispositivo-page.component'

export const DISPOSITIVO_ROUTES: Routes = [
  { path: ':id', component: DispositivoDetailComponent },
  { path: ':id/playback', component: DispositivoPageComponent },
]
