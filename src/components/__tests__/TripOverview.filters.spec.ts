import { describe, it, expect, vi, beforeEach } from 'vitest'
import { shallowMount, flushPromises } from '@vue/test-utils'
import TripOverview from '@/views/TripOverview.vue'
import TripCard from '@/components/TripCard.vue'
import { tripService } from '@/services/apiService'
import type { Trip } from '@/types'

vi.mock('@/services/apiService', () => ({
  tripService: {
    getAllTrips: vi.fn(),
  },
}))

describe('TripOverview (search & filters)', () => {
  const trips: Trip[] = [
    {
      tripId: 1,
      name: 'Tokyo Summer',
      destination: 'Tokyo, Japan',
      startDate: new Date('2026-07-01'),
      endDate: new Date('2026-07-10'),
      status: 'planned',
    },
    {
      tripId: 2,
      name: 'Paris Getaway',
      destination: 'Paris, France',
      startDate: new Date('2025-09-01'),
      endDate: new Date('2025-09-05'),
      status: 'visited',
    },
  ]

  beforeEach(() => {
    vi.mocked(tripService.getAllTrips).mockReset()
  })

  it('should filter trips by status when a status filter is selected', async () => {
    vi.mocked(tripService.getAllTrips).mockResolvedValueOnce(trips)

    const wrapper = shallowMount(TripOverview)
    await flushPromises()

    await wrapper.find('.filter-toggle').trigger('click')
    const statusSelect = wrapper.findAll('select')[0]
    await statusSelect.setValue('visited')

    const cards = wrapper.findAllComponents(TripCard)
    expect(cards).toHaveLength(1)
    expect(cards[0].props('trip').status).toBe('visited')
  })

  it('should show no results message when the search matches nothing', async () => {
    vi.mocked(tripService.getAllTrips).mockResolvedValueOnce(trips)

    const wrapper = shallowMount(TripOverview)
    await flushPromises()

    await wrapper.find('.search-input').setValue('nonexistent destination')

    expect(wrapper.findAllComponents(TripCard)).toHaveLength(0)
    expect(wrapper.text()).toContain('No trips match your filters.')
  })
})
