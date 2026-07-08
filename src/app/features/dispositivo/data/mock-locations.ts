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

const ADDR_MAGDALENA = 'Jirón María Parado de Bellido, Magdalena, Magdalena del Mar, Lima'
const ADDR_MIRAFLORES = 'Av. José Larco 1150, Miraflores, Lima'
const ADDR_SAN_ISIDRO = 'Av. Conquistadores 460, San Isidro, Lima'
const ADDR_JESUS_MARIA = 'Av. Pershing 345, Jesús María, Lima'
const ADDR_BREÑA = 'Jr. Huancavelica 220, Breña, Lima'
const ADDR_PUEBLO_LIBRE = 'Av. Brasil 2850, Pueblo Libre, Lima'

// Helper para armar una marcación con defaults coherentes.
function loc(
  key: string,
  time: string,
  lat: number,
  lng: number,
  opts: { bt?: boolean; latest?: boolean; addr?: string } = {},
): LocationPoint {
  return {
    lat,
    lng,
    address: opts.addr ?? ADDR_MAGDALENA,
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
    loc('2026-06-23', '12:05', -12.0960, -77.0480, { addr: ADDR_SAN_ISIDRO, bt: false }),
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
    loc('2026-07-07', '16:57', -12.0921, -77.0531, { latest: true }),
    loc('2026-07-07', '16:55', -12.0935, -77.0545),
    loc('2026-07-07', '16:40', -12.0950, -77.0560, { bt: false }),
    loc('2026-07-07', '15:22', -12.1000, -77.0390, { addr: ADDR_MIRAFLORES, bt: false }),
    loc('2026-07-07', '14:48', -12.0980, -77.0350, { addr: ADDR_MIRAFLORES }),
    loc('2026-07-07', '13:15', -12.0960, -77.0480, { addr: ADDR_SAN_ISIDRO, bt: false }),
    loc('2026-07-07', '12:02', -12.0830, -77.0500, { addr: ADDR_JESUS_MARIA }),
    loc('2026-07-07', '11:30', -12.0820, -77.0490, { addr: ADDR_JESUS_MARIA, bt: false }),
    loc('2026-07-07', '10:15', -12.0740, -77.0520, { addr: ADDR_BREÑA, bt: false }),
    loc('2026-07-07', '09:40', -12.0770, -77.0610, { addr: ADDR_PUEBLO_LIBRE }),
    loc('2026-07-07', '08:55', -12.0780, -77.0625, { addr: ADDR_PUEBLO_LIBRE, bt: false }),
    loc('2026-07-07', '07:30', -12.0921, -77.0531, { bt: false }),
  ],
}
