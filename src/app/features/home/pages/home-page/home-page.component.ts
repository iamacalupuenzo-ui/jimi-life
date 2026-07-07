import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { HomeHeaderComponent } from '../../components/home-header/home-header.component'
import { DeviceCardComponent } from '../../components/device-card/device-card.component'
import { JimiDevice } from '../../models/device.model'
import { MOCK_DEVICES } from '../../data/mock-devices'

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HomeHeaderComponent, DeviceCardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  readonly userName = 'Guillermo Amaro'
  readonly devices = signal<JimiDevice[]>(MOCK_DEVICES)
  readonly hasAlerts = signal(true)

  onDeviceOpened(device: JimiDevice): void {
    // TODO: navegar al detalle del dispositivo cuando exista la ruta
    console.info('Abrir dispositivo', device.id)
  }
}
