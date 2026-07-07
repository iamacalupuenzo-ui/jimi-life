import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-mobile-shell',
  standalone: true,
  templateUrl: './mobile-shell.component.html',
  styleUrl: './mobile-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileShellComponent {}
