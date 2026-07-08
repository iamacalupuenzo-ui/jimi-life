import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, computed, inject, signal } from '@angular/core'
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
export class DispositivoPageComponent implements OnInit, AfterViewInit {
  private router = new Router()
  private route: ActivatedRoute
  private elementRef = inject(ElementRef<HTMLElement>)

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

  ngAfterViewInit(): void {
    const activeBtn = this.elementRef.nativeElement.querySelector('.day-btn--active') as HTMLElement | null
    activeBtn?.scrollIntoView({ behavior: 'auto', inline: 'center', block: 'nearest' })
  }

  selectDay(key: string, event?: Event): void {
    this.activeDay.set(key)
    const target = event?.currentTarget as HTMLElement | undefined
    target?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

  toggleSheet(): void {
    this.sheetExpanded.update((v) => !v)
  }

  goBack(): void {
    this.router.navigate(['/home'])
  }
}
