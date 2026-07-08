import { JimiDevice } from '../models/device.model'

export const MOCK_DEVICES: JimiDevice[] = [
  {
    id: 'pb713e-12090',
    name: 'PB713E-12090',
    model: 'Jimi Tracker LTE',
    imageUrl: 'devices/tracker-pb713e.svg',
    battery: 96,
    connection: 'connected',
    withYou: true,
    lastSeenLabel: 'Ahora',
    address: 'Jirón María Parado de Bellido, Magdalena del Mar, Lima',
    aura: 'orange',
  },
  {
    id: 'r002e-30754',
    name: 'R002E-30754',
    model: 'Jimi Smart Ring',
    imageUrl: 'devices/ring-r002e.svg',
    battery: 42,
    connection: 'disconnected',
    withYou: false,
    lastSeenLabel: 'Hace 2 días',
    address: 'Jirón María Parado de Bellido, Magdalena del Mar, Lima',
    aura: 'blue',
  },
]
