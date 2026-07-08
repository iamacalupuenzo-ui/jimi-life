export type ConnectionState = 'connected' | 'disconnected'

export type DeviceAura = 'blue' | 'indigo' | 'orange' | 'peach'

export interface JimiDevice {
  id: string
  name: string
  model: string
  imageUrl: string
  /** Porcentaje 0-100, null si el dispositivo no reporta */
  battery: number | null
  connection: ConnectionState
  /** true si el tracker está junto al teléfono (BLE) */
  withYou: boolean
  lastSeenLabel: string
  address: string
  aura: DeviceAura
}
