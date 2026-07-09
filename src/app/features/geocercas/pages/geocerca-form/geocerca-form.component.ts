import {
  AfterViewInit, ChangeDetectionStrategy, Component, ElementRef,
  ViewChild, inject, signal,
} from '@angular/core'
import { Router } from '@angular/router'
import { DeviceMapComponent } from '../../../dispositivo/components/device-map/device-map.component'
import { LocationPoint } from '../../../dispositivo/models/location.model'

type GeofenceTab = 'safe' | 'unsafe'
type GeofenceShape = 'circle' | 'square' | 'hexagon'

const MOCK_ZONE_LOCATION: LocationPoint = {
  lat: -12.07,
  lng: -77.05,
  address: 'Pasaje José Quiñones, Los Patricios...',
  timestamp: '16:57',
  dateLabel: '2026-07-07',
  isBluetoothSync: true,
  isLatest: true,
}

@Component({
  selector: 'app-geocerca-form',
  standalone: true,
  imports: [DeviceMapComponent],
  templateUrl: './geocerca-form.component.html',
  styleUrl: './geocerca-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeocercaFormComponent implements AfterViewInit {
  private readonly router = inject(Router)

  @ViewChild('sheetEl') private sheetRef!: ElementRef<HTMLElement>
  @ViewChild('sheetBody') private bodyRef!: ElementRef<HTMLElement>

  readonly locations = signal<LocationPoint[]>([MOCK_ZONE_LOCATION])
  readonly activeTab = signal<GeofenceTab>('safe')
  readonly name = signal('01')
  readonly address = signal(MOCK_ZONE_LOCATION.address)
  readonly shape = signal<GeofenceShape>('hexagon')
  readonly deviceImage = signal('devices/tracker-pb713e.svg')
  readonly sheetExpanded = signal(true)

  private collapseY = 0
  private currentY = 0

  ngAfterViewInit(): void {
    this.measureCollapseY()
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

  setTab(tab: GeofenceTab): void {
    this.activeTab.set(tab)
  }

  setShape(shape: GeofenceShape): void {
    this.shape.set(shape)
  }

  onNameChange(value: string): void {
    this.name.set(value)
  }

  goBack(): void {
    this.router.navigate(['/geocercas'])
  }

  onDelete(): void {
    // Maqueta: eliminar geocerca aún no implementado.
  }

  onSave(): void {
    this.router.navigate(['/geocercas'])
  }
}
