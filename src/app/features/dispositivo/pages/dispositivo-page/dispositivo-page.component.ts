import { ChangeDetectionStrategy, Component, OnInit, computed, signal } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { DeviceMapComponent } from '../../components/device-map/device-map.component'
import { LocationPoint, DayTab } from '../../models/location.model'
import { MOCK_DEVICES } from '../../../home/data/mock-devices'
import { MOCK_DAYS, MOCK_LOCATIONS } from '../../data/mock-locations'
import { JimiDevice } from '../../../home/models/device.model'

@Component({
  selector: 'app-dispositivo-page',
  standalone: true,
  imports: [DeviceMapComponent],
  templateUrl: './dispositivo-page.component.html',
  styleUrl: './dispositivo-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DispositivoPageComponent implements OnInit {
  private router = new Router()
  private route: ActivatedRoute

  readonly device = signal<JimiDevice | null>(null)
  readonly days = signal<DayTab[]>(MOCK_DAYS)
  readonly activeDay = signal<string>('2026-07-07')
  readonly sheetExpanded = signal(false)

  readonly locations = computed<LocationPoint[]>(() =>
    MOCK_LOCATIONS[this.activeDay()] ?? [],
  )

  constructor(route: ActivatedRoute, router: Router) {
    this.route = route
    this.router = router
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    const found = MOCK_DEVICES.find((d) => d.id === id) ?? MOCK_DEVICES[0]
    this.device.set(found)
  }

  selectDay(key: string): void {
    this.activeDay.set(key)
  }

  toggleSheet(): void {
    this.sheetExpanded.update((v) => !v)
  }

  goBack(): void {
    this.router.navigate(['/home'])
  }
}
