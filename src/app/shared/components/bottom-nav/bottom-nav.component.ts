import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router'
import { filter, map } from 'rxjs'

interface NavItem {
  path: string
  label: string
  icon: 'home' | 'user'
}

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './bottom-nav.component.html',
  styleUrl: './bottom-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomNavComponent {
  private router = inject(Router)

  readonly hidden = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e) => (e as NavigationEnd).urlAfterRedirects.startsWith('/dispositivo')),
    ),
    { initialValue: this.router.url.startsWith('/dispositivo') },
  )

  readonly items: NavItem[] = [
    { path: '/home', label: 'Inicio', icon: 'home' },
    { path: '/perfil', label: 'Perfil', icon: 'user' },
  ]
}
