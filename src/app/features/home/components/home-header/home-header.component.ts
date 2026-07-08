import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { UserAvatarComponent } from '../../../../shared/components/user-avatar/user-avatar.component'

@Component({
  selector: 'app-home-header',
  standalone: true,
  imports: [UserAvatarComponent],
  templateUrl: './home-header.component.html',
  styleUrl: './home-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeHeaderComponent {
  readonly name = input.required<string>()
}
