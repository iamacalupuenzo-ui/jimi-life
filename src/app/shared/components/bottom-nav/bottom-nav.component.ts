import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router'
import { filter, map } from 'rxjs'
import { isFullscreenRoute } from '../../utils/fullscreen-route'

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
  host: {
    '[class.host--hidden]': 'hidden()',
    '[attr.aria-hidden]': 'hidden()',
  },
})
export class BottomNavComponent {
  private router = inject(Router)

  readonly hidden = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e) => isFullscreenRoute((e as NavigationEnd).urlAfterRedirects)),
    ),
    { initialValue: isFullscreenRoute(this.router.url) },
  )

  readonly items: NavItem[] = [
    { path: '/home', label: 'Inicio', icon: 'home' },
    { path: '/perfil', label: 'Perfil', icon: 'user' },
  ]
}
