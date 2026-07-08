import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { Router } from '@angular/router'
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
  private router = new Router()

  constructor(router: Router) {
    this.router = router
  }

  readonly userName = 'Guillermo Amaro'
  readonly devices = signal<JimiDevice[]>(MOCK_DEVICES)
  readonly hasAlerts = signal(true)

  onDeviceOpened(device: JimiDevice): void {
    this.router.navigate(['/dispositivo', device.id])
  }

  onAddDevice(): void {
    this.router.navigate(['/agregar-dispositivo'])
  }

  onScan(): void {
    this.router.navigate(['/agregar-dispositivo', 'escanear'])
  }
}
