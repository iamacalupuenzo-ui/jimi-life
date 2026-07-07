import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core'

@Component({
  selector: 'app-home-header',
  standalone: true,
  templateUrl: './home-header.component.html',
  styleUrl: './home-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeHeaderComponent {
  readonly name = input.required<string>()

  readonly initials = computed(() =>
    this.name()
      .split(' ')
      .map((part) => part.charAt(0))
      .slice(0, 2)
      .join('')
      .toUpperCase(),
  )
}
