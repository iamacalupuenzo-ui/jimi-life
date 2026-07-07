import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core'
import { JimiDevice } from '../../models/device.model'

@Component({
  selector: 'app-device-card',
  standalone: true,
  templateUrl: './device-card.component.html',
  styleUrl: './device-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeviceCardComponent {
  readonly device = input.required<JimiDevice>()
  readonly opened = output<JimiDevice>()

  readonly isConnected = computed(() => this.device().connection === 'connected')

  readonly batteryLevel = computed<'high' | 'low' | 'unknown'>(() => {
    const battery = this.device().battery
    if (battery === null) return 'unknown'
    return battery > 20 ? 'high' : 'low'
  })

  open(): void {
    this.opened.emit(this.device())
  }
}
