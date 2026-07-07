import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'

interface NavItem {
  path: string
  label: string
  icon: 'home' | 'map' | 'user'
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
  readonly items: NavItem[] = [
    { path: '/home', label: 'Inicio', icon: 'home' },
    { path: '/perfil', label: 'Perfil', icon: 'user' },
  ]
}
