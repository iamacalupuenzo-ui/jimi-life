import {
  ChangeDetectionStrategy, Component, ElementRef, OnDestroy,
  OnInit, ViewChild, input, output,
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

  readonly locations = input.required<LocationPoint[]>()
  readonly deviceImageUrl = input<string>('')
  /** false = solo el dispositivo (última ubicación), sin la traza histórica. */
  readonly showTrail = input<boolean>(true)
  /** Posición actual del teléfono; dibuja el punto azul de "mi ubicación". */
  readonly userLocation = input<{ lat: number; lng: number } | null>(null)
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

  renderMarkers(points: LocationPoint[]): void {
    this.markers.forEach((m) => m.remove())
    this.markers = []

    // En modo "solo dispositivo" mostramos únicamente la última ubicación.
    const visible = this.showTrail() ? points : points.slice(0, 1)

    visible.forEach((point, i) => {
      const isLatest = i === 0
      const icon = isLatest ? this.heroIcon() : this.dotIcon()
      const marker = L.marker([point.lat, point.lng], { icon })
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
    // no hay caja que encuadrar: centramos con un zoom fijo.
    if (coords.length === 1 || bounds.getNorthEast().equals(bounds.getSouthWest())) {
      this.map.setView(bounds.getCenter(), 16)
      return
    }

    this.map.fitBounds(bounds, {
      paddingTopLeft: [50, 110],
      paddingBottomRight: [50, 60],
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

  // Marker principal: imagen del dispositivo en círculo dorado
  private heroIcon(): L.DivIcon {
    const img = this.deviceImageUrl()
    return L.divIcon({
      className: '',
      html: `
        <div class="map-marker map-marker--hero">
          <div class="map-marker__pulse"></div>
          <div class="map-marker__circle">
            <img src="${img}" alt="device" />
          </div>
          <div class="map-marker__tip"></div>
        </div>`,
      iconSize: [64, 76],
      iconAnchor: [32, 76],
    })
  }

  // Marker secundario: punto dorado
  private dotIcon(): L.DivIcon {
    return L.divIcon({
      className: '',
      html: `<div class="map-marker map-marker--dot"><div class="map-marker__dot"></div></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    })
  }
}
