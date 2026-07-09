import { Geofence } from '../models/geofence.model'

// Para probar el empty-state, cambiar por: []
export const MOCK_GEOFENCES: Geofence[] = [
  {
    id: 'geo-001',
    index: 1,
    address: 'Pasaje Jose Quinones, Los Patricios, Jesus Maria, Province of Lima, Lima',
    active: true,
  },
]
