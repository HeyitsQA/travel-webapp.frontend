import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import NewTrip from '@/views/NewTrip.vue'
import { tripService } from '@/services/apiService'

const pushMock = vi.fn()

vi.mock('vue-router', () => ({
  useRouter: () => ({ push: pushMock }),
}))

vi.mock('@/services/apiService', () => ({
  tripService: {
    createTrip: vi.fn(),
  },
}))

describe('NewTrip (validation)', () => {
  beforeEach(() => {
    pushMock.mockReset()
    vi.mocked(tripService.createTrip).mockReset()
  })

  it('should show an error and not submit when the trip name is missing', async () => {
    const wrapper = mount(NewTrip)

    await wrapper.find('.btn-primary').trigger('click')

    expect(wrapper.find('.error-message').text()).toContain('Trip name is required')
    expect(tripService.createTrip).not.toHaveBeenCalled()
  })

  it('should show an error and not submit when the destination is missing', async () => {
    const wrapper = mount(NewTrip)

    await wrapper.find('input[placeholder="e.g. Tokyo Summer"]').setValue('Tokyo Summer')
    await wrapper.find('.btn-primary').trigger('click')

    expect(wrapper.find('.error-message').text()).toContain('Destination is required')
    expect(tripService.createTrip).not.toHaveBeenCalled()
  })

  it('should show an error and not submit when the required fields (dates) are missing', async () => {
    const wrapper = mount(NewTrip)

    await wrapper.find('input[placeholder="e.g. Tokyo Summer"]').setValue('Tokyo Summer')
    await wrapper.find('input[placeholder="e.g. Tokyo, Japan"]').setValue('Tokyo, Japan')
    await wrapper.find('.btn-primary').trigger('click')

    expect(wrapper.find('.error-message').text()).toContain('Start and end dates are required')
    expect(tripService.createTrip).not.toHaveBeenCalled()
  })

  it('should navigate back home when "Cancel" is clicked', async () => {
    const wrapper = mount(NewTrip)

    await wrapper.find('.btn-secondary').trigger('click')

    expect(pushMock).toHaveBeenCalledWith('/')
  })
})
