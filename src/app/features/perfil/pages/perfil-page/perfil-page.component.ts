import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-perfil-page',
  standalone: true,
  templateUrl: './perfil-page.component.html',
  styleUrl: './perfil-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PerfilPageComponent {
  readonly userName = 'Guillermo Amaro'
  readonly email = 'guillermo.amaro@comsatelglobal.com'
}
