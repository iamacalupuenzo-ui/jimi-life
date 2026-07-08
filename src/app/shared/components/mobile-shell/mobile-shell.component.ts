import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { NavigationEnd, Router } from '@angular/router'
import { filter, map } from 'rxjs'

@Component({
  selector: 'app-mobile-shell',
  standalone: true,
  templateUrl: './mobile-shell.component.html',
  styleUrl: './mobile-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileShellComponent {
  private router = inject(Router)

  // El bottom-nav flotante se oculta en /dispositivo: sin él, el padding
  // de despeje ya no debe reservarse (evita scroll extra y hueco al fondo).
  readonly hideNavClearance = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e) => (e as NavigationEnd).urlAfterRedirects.startsWith('/dispositivo')),
    ),
    { initialValue: this.router.url.startsWith('/dispositivo') },
  )
}
