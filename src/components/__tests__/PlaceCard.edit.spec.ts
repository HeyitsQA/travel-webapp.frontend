import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PlaceCard from '@/components/PlaceCard.vue'
import type { Place } from '@/types'

describe('PlaceCard (edit mode)', () => {
  const place: Place = {
    placeId: 7,
    name: 'Shibuya Crossing',
    category: 'Landmark',
    status: 'planned',
    rating: 0,
  }

  it('should switch to edit mode when "Edit" is clicked', async () => {
    const wrapper = mount(PlaceCard, { props: { place } })

    await wrapper.find('.btn-edit').trigger('click')

    expect(wrapper.find('.form').exists()).toBe(true)
    expect(wrapper.find('input[type="text"]').element.value).toBe('Shibuya Crossing')
  })


  it('should leave edit mode after saving', async () => {
    const wrapper = mount(PlaceCard, { props: { place } })

    await wrapper.find('.btn-edit').trigger('click')
    await wrapper.find('.btn-save').trigger('click')

    expect(wrapper.find('.form').exists()).toBe(false)
  })


  it('should update the rating when a star is clicked', async () => {
    const wrapper = mount(PlaceCard, { props: { place } })

    await wrapper.find('.btn-edit').trigger('click')
    const stars = wrapper.findAll('.star')
    await stars[2].trigger('click') // 3rd star -> rating of 3
    await wrapper.find('.btn-save').trigger('click')

    const emitted = wrapper.emitted('update:place')
    expect(emitted![0][0]).toMatchObject({ rating: 3 })
  })
})
