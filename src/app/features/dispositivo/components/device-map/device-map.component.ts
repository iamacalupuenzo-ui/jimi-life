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

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(this.map)

    this.renderMarkers(points)
  }

  renderMarkers(points: LocationPoint[]): void {
    this.markers.forEach((m) => m.remove())
    this.markers = []

    points.forEach((point, i) => {
      const isLatest = i === 0
      const icon = isLatest ? this.heroIcon() : this.dotIcon()
      const marker = L.marker([point.lat, point.lng], { icon })
        .addTo(this.map)
        .on('click', () => this.markerClicked.emit(point))
      this.markers.push(marker)
    })

    if (points.length > 0) {
      this.map.setView([points[0].lat, points[0].lng], 15)
    }
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
