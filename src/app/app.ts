import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { DOCUMENT } from '@angular/common'
import { NavigationEnd, Router, RouterOutlet } from '@angular/router'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { filter } from 'rxjs'
import { MobileShellComponent } from './shared/components/mobile-shell/mobile-shell.component'
import { BottomNavComponent } from './shared/components/bottom-nav/bottom-nav.component'

// Color de la barra de estado según la vista. Debe coincidir con lo que se
// pinta en el borde superior de cada pantalla (meta name="theme-color").
const THEME_HOME = '#FFD54F'   // header dorado del Home (= --gold-300)
const THEME_CAMERA = '#000000' // vista de cámara (escáner)
const THEME_LIGHT = '#FFFFFF'  // headers/fondos claros (detalle, perfil, etc.)

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MobileShellComponent, BottomNavComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly router = inject(Router)
  private readonly document = inject(DOCUMENT)

  constructor() {
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((e) => this.updateThemeColor(e.urlAfterRedirects))

    this.updateThemeColor(this.router.url)
  }

  private updateThemeColor(url: string): void {
    const meta = this.document.querySelector('meta[name="theme-color"]')
    meta?.setAttribute('content', this.themeColorFor(url))
  }

  private themeColorFor(url: string): string {
    if (url.startsWith('/agregar-dispositivo/escanear')) return THEME_CAMERA
    if (url.startsWith('/home')) return THEME_HOME
    return THEME_LIGHT
  }
}
