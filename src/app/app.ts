import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { MobileShellComponent } from './shared/components/mobile-shell/mobile-shell.component'
import { BottomNavComponent } from './shared/components/bottom-nav/bottom-nav.component'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MobileShellComponent, BottomNavComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
