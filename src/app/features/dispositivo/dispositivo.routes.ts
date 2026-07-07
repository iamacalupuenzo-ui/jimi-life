import { Routes } from '@angular/router'
import { DispositivoPageComponent } from './pages/dispositivo-page/dispositivo-page.component'

export const DISPOSITIVO_ROUTES: Routes = [
  { path: ':id', component: DispositivoPageComponent },
]
