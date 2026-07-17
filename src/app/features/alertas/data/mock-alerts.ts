import { JimiAlert } from '../models/alert.model'

function dt(isoDate: string, h: number, m: number, s: number): Date {
  return new Date(`${isoDate}T${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`)
}

export const MOCK_ALERTS: JimiAlert[] = [
  {
    id: 'a1',
    type: 'geofence-exit',
    title: 'Salió de la zona segura',
    deviceName: 'Bicicleta montañera',
    timestamp: dt('2026-07-17', 9, 1, 35),
    isRead: false,
    hasLocation: true,
  },
  {
    id: 'a2',
    type: 'geofence-enter',
    title: 'Entró en la zona segura',
    deviceName: 'Bicicleta montañera',
    timestamp: dt('2026-07-17', 8, 44, 10),
    isRead: false,
    hasLocation: true,
  },
  {
    id: 'a3',
    type: 'geofence-exit',
    title: 'Salió de la zona segura',
    deviceName: 'Bicicleta eléctrica',
    timestamp: dt('2026-07-17', 7, 30, 22),
    isRead: true,
    hasLocation: true,
  },
  {
    id: 'a4',
    type: 'geofence-exit',
    title: 'Salió de la zona segura',
    deviceName: 'Bicicleta montañera',
    timestamp: dt('2026-06-17', 14, 2, 2),
    isRead: true,
    hasLocation: true,
  },
  {
    id: 'a5',
    type: 'geofence-enter',
    title: 'Entró en la zona segura',
    deviceName: 'Bicicleta montañera',
    timestamp: dt('2026-06-17', 14, 1, 22),
    isRead: false,
    hasLocation: true,
  },
  {
    id: 'a6',
    type: 'geofence-enter',
    title: 'Entró en la zona segura',
    deviceName: 'Bicicleta eléctrica',
    timestamp: dt('2026-06-17', 11, 15, 0),
    isRead: true,
    hasLocation: true,
  },
]
