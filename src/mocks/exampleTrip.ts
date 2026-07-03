import type { Trip, Place } from '@/types'

export const EXAMPLE_TRIP_ID = -1

export const EXAMPLE_TRIP: Trip = {
  tripId: EXAMPLE_TRIP_ID,
  name: 'Kyoto Cherry Blossom Week (Example)',
  destination: 'Kyoto, Japan',
  startDate: new Date('2026-04-01'),
  endDate: new Date('2026-04-08'),
  status: 'planned',
  description:
    'A one-week springtime trip through Kyoto to catch the peak of cherry blossom season. ' +
    'Focused on temples, traditional tea houses, and long walks along the Philosopher\'s Path. ' +
    'This is a preview trip — data is not saved to the backend.',
  placesCount: 3,
}

export const EXAMPLE_PLACES: Place[] = [
  {
    placeId: -101,
    trip: { tripId: EXAMPLE_TRIP_ID },
    name: 'Fushimi Inari Shrine',
    category: 'Landmark',
    status: 'planned',
    notes: 'Get there before 7am to beat the crowds on the torii path.',
    rating: 5,
    address: '68 Fukakusa Yabunouchichō, Fushimi Ward, Kyoto',
    visitDate: '2026-04-02T07:00',
  },
  {
    placeId: -102,
    trip: { tripId: EXAMPLE_TRIP_ID },
    name: '% Arabica Kyoto Higashiyama',
    category: 'Café',
    status: 'planned',
    notes: 'Matcha latte + view of Yasaka Pagoda. Small shop, expect a line.',
    rating: 4,
    address: '87-5 Hoshinocho, Higashiyama Ward, Kyoto',
    visitDate: '2026-04-03T10:30',
  },
  {
    placeId: -103,
    trip: { tripId: EXAMPLE_TRIP_ID },
    name: 'Philosopher\'s Path',
    category: 'Activity',
    status: 'planned',
    notes: 'Roughly 2km walk lined with cherry trees between Ginkaku-ji and Nanzen-ji.',
    rating: 5,
    address: 'Sakyo Ward, Kyoto',
    visitDate: '2026-04-04T09:00',
  },
]

export function isExampleTripId(id: number): boolean {
  return id === EXAMPLE_TRIP_ID
}

export function cloneExampleTrip(): Trip {
  return { ...EXAMPLE_TRIP, startDate: new Date(EXAMPLE_TRIP.startDate), endDate: new Date(EXAMPLE_TRIP.endDate) }
}

export function cloneExamplePlaces(): Place[] {
  return EXAMPLE_PLACES.map(p => ({ ...p }))
}
