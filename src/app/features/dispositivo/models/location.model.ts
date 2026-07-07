export interface LocationPoint {
  lat: number
  lng: number
  address: string
  timestamp: string       // HH:MM
  dateLabel: string       // YYYY-MM-DD
  isBluetoothSync: boolean
  isLatest: boolean
}

export interface DayTab {
  key: string             // YYYY-MM-DD
  label: string           // 'Mon', 'Tue'…
  dayNum: string          // '01', '02'…
  monthLabel: string      // 'Jul'
  hasData: boolean
}
