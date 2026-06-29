import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import AddPlaceForm from '@/components/AddPlaceForm.vue'
import { placeService } from '@/services/apiService'

vi.mock('@/services/apiService', () => ({
  placeService: {
    createPlace: vi.fn(),
  },
}))

describe('AddPlaceForm (submission)', () => {
  const createdPlace = {
    placeId: 99,
    name: 'Tsukiji Market',
    category: 'Restaurant',
    status: 'planned',
  }

  beforeEach(() => {
    vi.mocked(placeService.createPlace).mockReset()
  })

  it('should call placeService.createPlace with the form data and trip id, then emit "place-added"', async () => {
    vi.mocked(placeService.createPlace).mockResolvedValueOnce(createdPlace)

    const wrapper = mount(AddPlaceForm, { props: { tripId: 5 } })
    await wrapper.find('.btn-add-place').trigger('click')
    await wrapper.find('input[placeholder="e.g., Eiffel Tower, Central Cafe"]').setValue('Tsukiji Market')

    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(placeService.createPlace).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Tsukiji Market', trip: { tripId: 5 } }),
    )
    expect(wrapper.emitted('place-added')).toHaveLength(1)
    expect(wrapper.emitted('place-added')![0]).toEqual([createdPlace])
  })

  it('should close and reset the form after a successful submission', async () => {
    vi.mocked(placeService.createPlace).mockResolvedValueOnce(createdPlace)

    const wrapper = mount(AddPlaceForm, { props: { tripId: 5 } })
    await wrapper.find('.btn-add-place').trigger('click')
    await wrapper.find('input[placeholder="e.g., Eiffel Tower, Central Cafe"]').setValue('Tsukiji Market')
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(wrapper.find('form').exists()).toBe(false)
    expect(wrapper.find('.btn-add-place').exists()).toBe(true)
  })

  it('should show an error message and keep the form open if the API call fails', async () => {
    vi.mocked(placeService.createPlace).mockRejectedValueOnce(new Error('network error'))

    const wrapper = mount(AddPlaceForm, { props: { tripId: 5 } })
    await wrapper.find('.btn-add-place').trigger('click')
    await wrapper.find('input[placeholder="e.g., Eiffel Tower, Central Cafe"]').setValue('Tsukiji Market')
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(wrapper.find('.error-message').text()).toContain('Failed to create place')
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.emitted('place-added')).toBeUndefined()
  })
})
