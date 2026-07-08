import { Routes } from '@angular/router'
import { AgregarPageComponent } from './pages/agregar-page/agregar-page.component'
import { EscanearPageComponent } from './pages/escanear-page/escanear-page.component'
import { ManualPageComponent } from './pages/manual-page/manual-page.component'

export const AGREGAR_DISPOSITIVO_ROUTES: Routes = [
  { path: '', component: AgregarPageComponent },
  { path: 'escanear', component: EscanearPageComponent },
  { path: 'manual', component: ManualPageComponent },
]
