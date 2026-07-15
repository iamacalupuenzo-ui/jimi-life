import {
  ChangeDetectionStrategy, Component, ElementRef, OnDestroy,
  OnInit, ViewChild, effect, input, output,
} from '@angular/core'
import * as L from 'leaflet'
import { LocationPoint } from '../../models/location.model'

@Component({
  selector: 'app-device-map',
  standalone: true,
  templateUrl: './device-map.component.html',
  styleUrl: './device-map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeviceMapComponent implements OnInit, OnDestroy {
  @ViewChild('mapEl', { static: true }) mapEl!: ElementRef<HTMLDivElement>

  constructor() {
    // Re-renderiza markers cuando cambian las ubicaciones (p.ej. el usuario selecciona otro día).
    // El guard `this.map` evita que se ejecute antes de ngOnInit.
    effect(() => {
      const points = this.locations()
      if (this.map) this.renderMarkers(points)
    })
  }

  readonly locations = input.required<LocationPoint[]>()
  readonly deviceImageUrl = input<string>('')
  /** false = solo el dispositivo (última ubicación), sin la traza histórica. */
  readonly showTrail = input<boolean>(true)
  /** Posición actual del teléfono; dibuja el punto azul de "mi ubicación". */
  readonly userLocation = input<{ lat: number; lng: number } | null>(null)
  /** Píxeles para elevar el punto enfocado (deja aire arriba del sheet). */
  readonly focusRaise = input<number>(0)
  /** Padding inferior del encuadre: reserva el alto del bottom sheet. */
  readonly fitPaddingBottom = input<number>(60)
  /** Padding superior del encuadre: reserva el alto del header de cada página. */
  readonly fitPaddingTop = input<number>(110)
  readonly markerClicked = output<LocationPoint>()

  private map!: L.Map
  private markers: L.Marker[] = []

  ngOnInit(): void {
    this.initMap()
  }

  ngOnDestroy(): void {
    this.map?.remove()
  }

  private initMap(): void {
    const points = this.locations()
    const center = points.length
      ? L.latLng(points[0].lat, points[0].lng)
      : L.latLng(-12.0921, -77.0531)

    this.map = L.map(this.mapEl.nativeElement, {
      center,
      zoom: 15,
      zoomControl: false,
      attributionControl: false,
    })

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: ['a', 'b', 'c', 'd'],
    }).addTo(this.map)

    this.renderMarkers(points)
  }

  /** Re-encuadra el mapa con los paddings actuales (llamar tras cambio de sheet). */
  refit(): void {
    if (!this.map) return
    const points = this.locations()
    const visible = this.showTrail() ? points : points.slice(0, 1)
    const user = this.userLocation()
    this.fitView(visible, user)
  }

  renderMarkers(points: LocationPoint[]): void {
    this.markers.forEach((m) => m.remove())
    this.markers = []

    // En modo "solo dispositivo" mostramos únicamente la última ubicación.
    const visible = this.showTrail() ? points : points.slice(0, 1)

    visible.forEach((point, i) => {
      const isLatest = i === 0
      const icon = isLatest ? this.heroIcon(point.timestamp) : this.dotIcon()
      const marker = L.marker([point.lat, point.lng], { icon, zIndexOffset: isLatest ? 1000 : -1000 })
        .addTo(this.map)
        .on('click', () => this.markerClicked.emit(point))
      this.markers.push(marker)
    })

    const user = this.userLocation()
    if (user) {
      const marker = L.marker([user.lat, user.lng], { icon: this.userIcon() }).addTo(this.map)
      this.markers.push(marker)
    }

    this.fitView(visible, user)
  }

  // Encuadra la vista para que se vean tanto el dispositivo como mi ubicación.
  private fitView(points: LocationPoint[], user: { lat: number; lng: number } | null): void {
    const coords = points.map((p) => L.latLng(p.lat, p.lng))
    if (user) coords.push(L.latLng(user.lat, user.lng))
    if (coords.length === 0) return

    const bounds = L.latLngBounds(coords)

    // Si todos los puntos coinciden (p. ej. dispositivo == mi ubicación),
    // no hay caja que encuadrar: centramos con un zoom fijo, elevando el
    // punto para que no quede pegado al bottom sheet.
    if (coords.length === 1 || bounds.getNorthEast().equals(bounds.getSouthWest())) {
      const zoom = 16
      const center = bounds.getCenter()
      const raise = this.focusRaise()
      if (raise > 0) {
        const shifted = this.map.project(center, zoom).add([0, raise])
        this.map.setView(this.map.unproject(shifted, zoom), zoom)
      } else {
        this.map.setView(center, zoom)
      }
      return
    }

    this.map.fitBounds(bounds, {
      paddingTopLeft: [50, this.fitPaddingTop()],
      paddingBottomRight: [50, this.fitPaddingBottom()],
      maxZoom: 16,
    })
  }

  // Marker "mi ubicación": punto azul con halo de precisión (estilo GPS).
  private userIcon(): L.DivIcon {
    return L.divIcon({
      className: '',
      html: `
        <div class="user-marker">
          <div class="user-marker__accuracy"></div>
          <div class="user-marker__dot"></div>
        </div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    })
  }

  // Marker principal: imagen del dispositivo en círculo con badge de hora
  private heroIcon(timestamp: string): L.DivIcon {
    const img = this.deviceImageUrl()
    return L.divIcon({
      className: '',
      html: `
        <div class="map-marker map-marker--hero">
          <div class="map-marker__time-badge">${timestamp}</div>
          <div class="map-marker__device">
            <div class="map-marker__pulse"></div>
            <div class="map-marker__circle">
              <img src="${img}" alt="device" />
            </div>
          </div>
          <div class="map-marker__tip"></div>
        </div>`,
      iconSize: [84, 108],
      iconAnchor: [42, 108],
    })
  }

  // Marker secundario: speech bubble semi-transparente (path unificado, sin solapamiento)
  private dotIcon(): L.DivIcon {
    return L.divIcon({
      className: '',
      html: `
        <svg class="map-marker map-marker--balloon" width="24" height="30"
             viewBox="0 0 24 30" xmlns="http://www.w3.org/2000/svg">
          <!--
            Path unificado: arco grande (círculo) + V de la pestaña.
            M15 22.6  → punto derecho de la base de la pestaña (sobre el círculo)
            A11 11 0 1 0 9 22.6 → arco largo antihorario hasta el punto izquierdo
            L12 30 Z  → punta de la pestaña y cierre
          -->
          <path d="M15 22.6 A11 11 0 1 0 9 22.6 L12 30 Z"
                fill="rgba(18,87,204,0.32)"
                stroke="#1257CC"
                stroke-width="1.8"
                stroke-linejoin="round"/>
        </svg>`,
      iconSize: [24, 30],
      iconAnchor: [12, 30],
    })
  }
}
