import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core'
import { Location } from '@angular/common'
import { AlertGroup, AlertType, JimiAlert } from '../../models/alert.model'
import { MOCK_ALERTS } from '../../data/mock-alerts'

export type AlertTab = 'alertas' | 'mensajes'

export interface AlertIconConfig {
  iconKey: AlertType
  chipClass: string
}

const TODAY_ISO = new Date().toISOString().slice(0, 10)

@Component({
  selector: 'app-alertas-page',
  standalone: true,
  imports: [],
  templateUrl: './alertas-page.component.html',
  styleUrl: './alertas-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertasPageComponent {
  private location = inject(Location)

  readonly activeTab = signal<AlertTab>('alertas')
  readonly alerts = signal<JimiAlert[]>(MOCK_ALERTS)

  readonly groups = computed<AlertGroup[]>(() => {
    const map = new Map<string, JimiAlert[]>()
    for (const alert of this.alerts()) {
      const key = this.dateKey(alert.timestamp)
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(alert)
    }
    return Array.from(map.entries()).map(([dateLabel, alerts]) => ({ dateLabel, alerts }))
  })

  readonly unreadAlerts = computed(() => this.alerts().filter(a => !a.isRead).length)

  goBack(): void {
    this.location.back()
  }

  setTab(tab: AlertTab): void {
    this.activeTab.set(tab)
  }

  markAllRead(): void {
    this.alerts.update(list => list.map(a => ({ ...a, isRead: true })))
  }

  timeLabel(date: Date): string {
    return date.toTimeString().slice(0, 8)
  }

  chipClass(type: AlertType): string {
    if (type === 'bluetooth-interrupted' || type === 'bluetooth-activated') return 'chip--blue'
    if (type === 'charge-start') return 'chip--green'
    return 'chip--red'
  }

  private dateKey(date: Date): string {
    const iso = date.toISOString().slice(0, 10)
    return iso === TODAY_ISO ? 'Hoy' : iso
  }
}
