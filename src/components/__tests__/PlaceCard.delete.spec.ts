import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PlaceCard from '@/components/PlaceCard.vue'
import type { Place } from '@/types'

describe('PlaceCard (delete)', () => {
  const place: Place = {
    placeId: 42,
    name: 'Senso-ji Temple',
    category: 'Landmark',
    status: 'visited',
  }

  it('should emit "delete" with the place id when "Delete" is clicked', async () => {
    const wrapper = mount(PlaceCard, { props: { place } })

    await wrapper.find('.btn-delete').trigger('click')

    expect(wrapper.emitted('delete')).toHaveLength(1)
    expect(wrapper.emitted('delete')![0]).toEqual([42])
  })

  it('should not emit "update:place" when only deleting', async () => {
    const wrapper = mount(PlaceCard, { props: { place } })

    await wrapper.find('.btn-delete').trigger('click')

    expect(wrapper.emitted('update:place')).toBeUndefined()
  })
})
