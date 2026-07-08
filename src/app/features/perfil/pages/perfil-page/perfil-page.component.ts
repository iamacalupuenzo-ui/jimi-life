import { ChangeDetectionStrategy, Component } from '@angular/core'
import { UserAvatarComponent } from '../../../../shared/components/user-avatar/user-avatar.component'

interface MenuItem {
  id: 'settings' | 'help' | 'about'
  label: string
  href: string
}

@Component({
  selector: 'app-perfil-page',
  standalone: true,
  imports: [UserAvatarComponent],
  templateUrl: './perfil-page.component.html',
  styleUrl: './perfil-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PerfilPageComponent {
  readonly userName = 'Guillermo Amaro'
  readonly email = 'guillermo.amaro@comsatelglobal.com'

  readonly orders = { total: 0, inUse: 0 }
  readonly devices = { total: 2, active: 2 }

  readonly menuItems: MenuItem[] = [
    { id: 'settings', label: 'Ajustes',              href: '#' },
    { id: 'help',     label: 'Ayuda y sugerencias',  href: '#' },
    { id: 'about',    label: 'Acerca de',            href: '#' },
  ]
}
