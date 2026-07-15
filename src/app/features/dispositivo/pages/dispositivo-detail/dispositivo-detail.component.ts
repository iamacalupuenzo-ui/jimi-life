import {
  AfterViewInit, ChangeDetectionStrategy, Component, ElementRef,
  OnInit, ViewChild, computed, inject, signal,
} from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { DeviceMapComponent } from '../../components/device-map/device-map.component'
import { IconComponent } from '../../../../shared/components/icon/icon.component'
import { MOCK_DEVICES } from '../../../home/data/mock-devices'
import { MOCK_LOCATIONS } from '../../data/mock-locations'
import { JimiDevice } from '../../../home/models/device.model'
import { LocationPoint } from '../../models/location.model'

@Component({
  selector: 'app-dispositivo-detail',
  standalone: true,
  imports: [DeviceMapComponent, IconComponent],
  templateUrl: './dispositivo-detail.component.html',
  styleUrl: './dispositivo-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DispositivoDetailComponent implements OnInit, AfterViewInit {
  private readonly router = inject(Router)
  private readonly route = inject(ActivatedRoute)

  @ViewChild('sheetEl') private sheetRef!: ElementRef<HTMLElement>
  @ViewChild('sheetBody') private bodyRef!: ElementRef<HTMLElement>
  @ViewChild(DeviceMapComponent) private mapRef?: DeviceMapComponent

  readonly device = signal<JimiDevice | null>(null)
  readonly sheetExpanded = signal(false)

  readonly isConnected = computed(() => this.device()?.connection === 'connected')

  readonly batteryLow = computed(() => {
    const battery = this.device()?.battery
    return battery !== null && battery !== undefined && battery <= 20
  })

  readonly locations = computed<LocationPoint[]>(() =>
    MOCK_LOCATIONS['2026-07-07'] ?? [],
  )

  readonly latestAddress = computed(() => this.locations()[0]?.address ?? '')

  // "Mi ubicación" comparte punto con el dispositivo (está Contigo).
  readonly userLocation = computed(() => {
    const latest = this.locations()[0]
    return latest ? { lat: latest.lat, lng: latest.lng } : null
  })

  private collapseY = 0
  private currentY = 0

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.device.set(MOCK_DEVICES.find((d) => d.id === id) ?? MOCK_DEVICES[0])
  }

  ngAfterViewInit(): void {
    this.measureCollapseY()
    this.translate(this.collapseY)
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
    setTimeout(() => this.mapRef?.refit(), 360)
  }

  collapseSheet(): void {
    this.measureCollapseY()
    this.sheetExpanded.set(false)
    this.translate(this.collapseY, true)
    setTimeout(() => this.mapRef?.refit(), 360)
  }

  toggleSheet(): void {
    if (this.sheetExpanded()) this.collapseSheet()
    else this.expandSheet()
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
      if (Math.abs(delta) > 12) didDrag = true
      if (!didDrag) return
      this.translate(Math.max(0, Math.min(this.collapseY, startTranslate + delta)))
    }

    const onUp = (e: PointerEvent) => {
      handle.removeEventListener('pointermove', onMove as EventListener)
      handle.removeEventListener('pointerup', onUp as EventListener)
      try { handle.releasePointerCapture(e.pointerId) } catch { /* noop */ }

      if (didDrag) {
        const delta = e.clientY - startY
        if (delta > this.collapseY * 0.5) this.collapseSheet()
        else if (delta < -this.collapseY * 0.5) this.expandSheet()
        else this.sheetExpanded() ? this.expandSheet() : this.collapseSheet()
      } else {
        this.toggleSheet()
      }
    }

    handle.addEventListener('pointermove', onMove as EventListener)
    handle.addEventListener('pointerup', onUp as EventListener)
  }

  goBack(): void {
    this.router.navigate(['/home'])
  }

  goToPlayback(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.router.navigate(['/dispositivo', id, 'playback'])
  }

  goToGeofences(): void {
    this.router.navigate(['/geocercas'])
  }
}
