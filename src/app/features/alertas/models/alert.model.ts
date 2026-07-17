export type AlertType =
  | 'bluetooth-interrupted'
  | 'bluetooth-activated'
  | 'charge-start'
  | 'battery-low'
  | 'device-on'
  | 'geofence-enter'
  | 'geofence-exit'

export interface JimiAlert {
  id: string
  type: AlertType
  title: string
  deviceName: string
  timestamp: Date
  isRead: boolean
  hasLocation: boolean
}

export interface AlertGroup {
  dateLabel: string
  alerts: JimiAlert[]
}
