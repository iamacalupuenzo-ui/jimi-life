import { DayTab, LocationPoint } from '../models/location.model'

// Últimos 15 días incluyendo HOY (2026-07-07). Generado con cálculo de calendario.
export const MOCK_DAYS: DayTab[] = [
  { key: '2026-06-23', label: 'Mar', dayNum: '23', monthLabel: 'Jun', hasData: true },
  { key: '2026-06-24', label: 'Mié', dayNum: '24', monthLabel: 'Jun', hasData: true },
  { key: '2026-06-25', label: 'Jue', dayNum: '25', monthLabel: 'Jun', hasData: false },
  { key: '2026-06-26', label: 'Vie', dayNum: '26', monthLabel: 'Jun', hasData: true },
  { key: '2026-06-27', label: 'Sáb', dayNum: '27', monthLabel: 'Jun', hasData: true },
  { key: '2026-06-28', label: 'Dom', dayNum: '28', monthLabel: 'Jun', hasData: false },
  { key: '2026-06-29', label: 'Lun', dayNum: '29', monthLabel: 'Jun', hasData: true },
  { key: '2026-06-30', label: 'Mar', dayNum: '30', monthLabel: 'Jun', hasData: false },
  { key: '2026-07-01', label: 'Mié', dayNum: '01', monthLabel: 'Jul', hasData: true },
  { key: '2026-07-02', label: 'Jue', dayNum: '02', monthLabel: 'Jul', hasData: true },
  { key: '2026-07-03', label: 'Vie', dayNum: '03', monthLabel: 'Jul', hasData: true },
  { key: '2026-07-04', label: 'Sáb', dayNum: '04', monthLabel: 'Jul', hasData: false },
  { key: '2026-07-05', label: 'Dom', dayNum: '05', monthLabel: 'Jul', hasData: true },
  { key: '2026-07-06', label: 'Lun', dayNum: '06', monthLabel: 'Jul', hasData: true },
  { key: '2026-07-07', label: 'Hoy', dayNum: '07', monthLabel: 'Jul', hasData: true },
]

const ADDR = 'Jirón María Parado de Bellido, Magdalena, Magdalena del Mar, Province of Lima'

// Helper para armar una marcación con defaults coherentes.
function loc(
  key: string,
  time: string,
  lat: number,
  lng: number,
  opts: { bt?: boolean; latest?: boolean } = {},
): LocationPoint {
  return {
    lat,
    lng,
    address: ADDR,
    timestamp: time,
    dateLabel: key,
    isBluetoothSync: opts.bt ?? true,
    isLatest: opts.latest ?? false,
  }
}

export const MOCK_LOCATIONS: Record<string, LocationPoint[]> = {
  '2026-06-23': [
    loc('2026-06-23', '18:12', -12.0921, -77.0531, { latest: true }),
    loc('2026-06-23', '17:40', -12.0935, -77.0545, { bt: false }),
    loc('2026-06-23', '12:05', -12.0950, -77.0560, { bt: false }),
  ],
  '2026-06-24': [
    loc('2026-06-24', '19:30', -12.0921, -77.0531, { latest: true }),
    loc('2026-06-24', '08:15', -12.0935, -77.0545),
  ],
  '2026-06-26': [
    loc('2026-06-26', '20:45', -12.0921, -77.0531, { latest: true }),
    loc('2026-06-26', '14:20', -12.0950, -77.0560, { bt: false }),
    loc('2026-06-26', '09:50', -12.0935, -77.0545),
  ],
  '2026-06-27': [
    loc('2026-06-27', '16:10', -12.0921, -77.0531, { latest: true }),
    loc('2026-06-27', '11:30', -12.0935, -77.0545),
  ],
  '2026-06-29': [
    loc('2026-06-29', '21:05', -12.0921, -77.0531, { latest: true }),
    loc('2026-06-29', '15:00', -12.0950, -77.0560, { bt: false }),
    loc('2026-06-29', '10:25', -12.0935, -77.0545),
  ],
  '2026-07-01': [
    loc('2026-07-01', '18:50', -12.0921, -77.0531, { latest: true }),
    loc('2026-07-01', '13:15', -12.0935, -77.0545, { bt: false }),
  ],
  '2026-07-02': [
    loc('2026-07-02', '19:20', -12.0921, -77.0531, { latest: true }),
    loc('2026-07-02', '12:40', -12.0950, -77.0560),
    loc('2026-07-02', '08:30', -12.0935, -77.0545, { bt: false }),
  ],
  '2026-07-03': [
    loc('2026-07-03', '17:55', -12.0921, -77.0531, { latest: true }),
    loc('2026-07-03', '16:30', -12.0935, -77.0545),
  ],
  '2026-07-05': [
    loc('2026-07-05', '20:10', -12.0921, -77.0531, { latest: true }),
    loc('2026-07-05', '14:05', -12.0950, -77.0560, { bt: false }),
  ],
  '2026-07-06': [
    loc('2026-07-06', '22:00', -12.0921, -77.0531, { latest: true }),
    loc('2026-07-06', '15:45', -12.0935, -77.0545),
    loc('2026-07-06', '09:20', -12.0950, -77.0560, { bt: false }),
  ],
  '2026-07-07': [
    {
      lat: -12.0921, lng: -77.0531,
      address: ADDR,
      timestamp: '16:57', dateLabel: '2026-07-07',
      isBluetoothSync: true, isLatest: true,
    },
    {
      lat: -12.0935, lng: -77.0545,
      address: ADDR,
      timestamp: '16:55', dateLabel: '2026-07-07',
      isBluetoothSync: true, isLatest: false,
    },
    {
      lat: -12.0950, lng: -77.0560,
      address: ADDR,
      timestamp: '16:40', dateLabel: '2026-07-07',
      isBluetoothSync: false, isLatest: false,
    },
  ],
}
