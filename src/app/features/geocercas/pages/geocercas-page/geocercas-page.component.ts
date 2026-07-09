import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { Router } from '@angular/router'
import { Geofence } from '../../models/geofence.model'
import { MOCK_GEOFENCES } from '../../data/mock-geofences'

@Component({
  selector: 'app-geocercas-page',
  standalone: true,
  imports: [],
  templateUrl: './geocercas-page.component.html',
  styleUrl: './geocercas-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeocercasPageComponent {
  private readonly router = inject(Router)

  readonly geofences = signal<Geofence[]>(MOCK_GEOFENCES)

  goBack(): void {
    this.router.navigate(['/home'])
  }

  toggle(geofence: Geofence): void {
    this.geofences.update((list) =>
      list.map((g) => (g.id === geofence.id ? { ...g, active: !g.active } : g)),
    )
  }

  onAdd(): void {
    this.router.navigate(['/geocercas', 'nueva'])
  }

  formatIndex(index: number): string {
    return String(index).padStart(2, '0')
  }
}
