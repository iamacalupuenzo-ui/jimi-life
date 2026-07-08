import {
  AfterViewInit, ChangeDetectionStrategy, Component,
  ElementRef, OnInit, ViewChild, computed, inject, signal,
} from '@angular/core'
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
  private readonly router = inject(Router)
  private readonly route = inject(ActivatedRoute)

  @ViewChild('sheetEl') private sheetRef!: ElementRef<HTMLElement>
  @ViewChild('sheetBody') private bodyRef!: ElementRef<HTMLElement>

  readonly device = signal<JimiDevice | null>(null)
  readonly days = signal<DayTab[]>(MOCK_DAYS)
  readonly activeDay = signal<string>('2026-07-07')
  readonly sheetExpanded = signal(true)

  readonly locations = computed<LocationPoint[]>(() =>
    MOCK_LOCATIONS[this.activeDay()] ?? [],
  )

  private collapseY = 0
  private currentY = 0

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.device.set(MOCK_DEVICES.find((d) => d.id === id) ?? MOCK_DEVICES[0])
  }

  ngAfterViewInit(): void {
    this.measureCollapseY()
    const activeBtn = this.sheetRef.nativeElement
      .querySelector('.day-btn--active') as HTMLElement | null
    activeBtn?.scrollIntoView({ behavior: 'auto', inline: 'center', block: 'nearest' })
  }

  private measureCollapseY(): void {
    this.collapseY = this.bodyRef.nativeElement.offsetHeight
  }

  private translate(y: number, animated = false): void {
    const el = this.sheetRef.nativeElement
    el.style.transition = animated ? 'transform 0.35s cubic-bezier(0.4,0,0.2,1)' : 'none'
    el.style.transform = y === 0 ? '' : `translateY(${y}px)`
    this.currentY = y
  }

  expandSheet(): void {
    this.sheetExpanded.set(true)
    this.translate(0, true)
  }

  collapseSheet(): void {
    this.measureCollapseY()
    this.sheetExpanded.set(false)
    this.translate(this.collapseY, true)
  }

  toggleSheet(): void {
    if (this.sheetExpanded()) this.collapseSheet()
    else this.expandSheet()
  }

  goBack(): void {
    this.router.navigate(['/home'])
  }

  selectDay(key: string, event?: Event): void {
    this.activeDay.set(key)
    ;(event?.currentTarget as HTMLElement | undefined)?.scrollIntoView({
      behavior: 'smooth', inline: 'center', block: 'nearest',
    })
    if (!this.sheetExpanded()) this.expandSheet()
  }

  onSheetGrab(event: PointerEvent): void {
    if (event.button !== 0) return
    event.preventDefault()

    const startY = event.clientY
    const startTranslate = this.currentY
    let didDrag = false

    const handle = event.currentTarget as HTMLElement
    handle.setPointerCapture(event.pointerId)

    const onMove = (e: PointerEvent) => {
      const delta = e.clientY - startY
      if (Math.abs(delta) > 5) didDrag = true
      if (!didDrag) return
      this.translate(Math.max(0, Math.min(this.collapseY, startTranslate + delta)))
    }

    const onUp = (e: PointerEvent) => {
      handle.removeEventListener('pointermove', onMove as EventListener)
      handle.removeEventListener('pointerup', onUp as EventListener)
      try { handle.releasePointerCapture(e.pointerId) } catch { /* noop */ }

      if (didDrag) {
        const delta = e.clientY - startY
        if (delta > this.collapseY / 3) this.collapseSheet()
        else if (delta < -this.collapseY / 3) this.expandSheet()
        else this.sheetExpanded() ? this.expandSheet() : this.collapseSheet()
      } else {
        this.toggleSheet()
      }
    }

    handle.addEventListener('pointermove', onMove as EventListener)
    handle.addEventListener('pointerup', onUp as EventListener)
  }
}
