import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PlaceCard from '@/components/PlaceCard.vue'
import type { Place } from '@/types'

describe('PlaceCard (view mode)', () => {
  const visitedPlace: Place = {
    placeId: 1,
    name: 'Eiffel Tower',
    category: 'Landmark',
    status: 'visited',
    notes: 'Beautiful at night',
    rating: 5,
    address: 'Champ de Mars, Paris',
  }

  const plannedPlace: Place = {
    placeId: 2,
    name: 'Louvre Museum',
    category: 'Landmark',
    status: 'planned',
  }

  it('should render the place name, category and rating', () => {
    const wrapper = mount(PlaceCard, { props: { place: visitedPlace } })

    expect(wrapper.text()).toContain('Eiffel Tower')
    expect(wrapper.text()).toContain('Landmark')
    expect(wrapper.text()).toContain('5/5')
  })

  it('should show the correct status of places (visited/planned)', () => {
    const visitedWrapper = mount(PlaceCard, { props: { place: visitedPlace } })
    const plannedWrapper = mount(PlaceCard, { props: { place: plannedPlace } })

    expect(visitedWrapper.text()).toContain('✓ Visited')
    expect(plannedWrapper.text()).toContain('○ Planned')
  })

  it('should start in view mode, hiding the edit form', () => {
    const wrapper = mount(PlaceCard, { props: { place: visitedPlace } })

    expect(wrapper.find('.form').exists()).toBe(false)
    expect(wrapper.find('.btn-edit').exists()).toBe(true)
  })
})
