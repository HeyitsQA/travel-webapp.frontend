import { describe, it, expect } from 'vitest'
import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import TripCard from '@/components/TripCard.vue'

describe('TripCard', () => {
  const baseTrip = {
    tripId: 1,
    name: 'Tokyo Summer',
    destination: 'Tokyo, Japan',
    startDate: '2026-07-01',
    endDate: '2026-07-10',
    status: 'planned',
    placesCount: 4,
  }

  it('should render the trip name, destination and place count', () => {
    const wrapper = shallowMount(TripCard, {
      props: { trip: baseTrip },
      global: { stubs: { RouterLink: RouterLinkStub } },
    })

    expect(wrapper.text()).toContain('Tokyo Summer')
    expect(wrapper.text()).toContain('Tokyo, Japan')
    expect(wrapper.text()).toContain('4 places')
    expect(wrapper.text()).toContain('planned')
  })

  it('should link to the trip-detail route using the trip id', () => {
    const wrapper = shallowMount(TripCard, {
      props: { trip: baseTrip },
      global: { stubs: { RouterLink: RouterLinkStub } },
    })

    const link = wrapper.findComponent(RouterLinkStub)
    expect(link.props().to).toEqual({ name: 'trip-detail', params: { id: 1 } })
  })

})
