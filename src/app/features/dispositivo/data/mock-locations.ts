import { DayTab, LocationPoint } from '../models/location.model'

export const MOCK_DAYS: DayTab[] = [
  { key: '2026-07-01', label: 'Mié', dayNum: '01', monthLabel: 'Jul', hasData: true },
  { key: '2026-07-02', label: 'Jue', dayNum: '02', monthLabel: 'Jul', hasData: true },
  { key: '2026-07-03', label: 'Vie', dayNum: '03', monthLabel: 'Jul', hasData: true },
  { key: '2026-07-04', label: 'Sáb', dayNum: '04', monthLabel: 'Jul', hasData: false },
  { key: '2026-07-05', label: 'Dom', dayNum: '05', monthLabel: 'Jul', hasData: false },
  { key: '2026-07-07', label: 'Hoy', dayNum: '07', monthLabel: 'Jul', hasData: true },
]

export const MOCK_LOCATIONS: Record<string, LocationPoint[]> = {
  '2026-07-07': [
    {
      lat: -12.0921, lng: -77.0531,
      address: 'Jirón María Parado de Bellido, Magdalena, Magdalena del Mar, Province of Lima',
      timestamp: '16:57', dateLabel: '2026-07-07',
      isBluetoothSync: true, isLatest: true,
    },
    {
      lat: -12.0935, lng: -77.0545,
      address: 'Jirón María Parado de Bellido, Magdalena, Magdalena del Mar, Province of Lima',
      timestamp: '16:55', dateLabel: '2026-07-07',
      isBluetoothSync: true, isLatest: false,
    },
    {
      lat: -12.0950, lng: -77.0560,
      address: 'Jirón María Parado de Bellido, Magdalena, Magdalena del Mar, Province of Lima',
      timestamp: '16:40', dateLabel: '2026-07-07',
      isBluetoothSync: false, isLatest: false,
    },
  ],
}
