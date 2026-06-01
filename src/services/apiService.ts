// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

// Trip API calls
export const tripService = {
  async getAllTrips() {
    const response = await fetch(`${API_BASE_URL}/trips`)
    if (!response.ok) throw new Error('Failed to fetch trips')
    return response.json()
  },

  async getTripById(id: number) {
    const response = await fetch(`${API_BASE_URL}/trips/${id}`)
    if (!response.ok) throw new Error('Trip not found')
    return response.json()
  },

  async createTrip(tripData: any) {
    const response = await fetch(`${API_BASE_URL}/trips`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tripData)
    })
    if (!response.ok) throw new Error('Failed to create trip')
    return response.json()
  },

  async updateTrip(id: number, tripData: any) {
    const response = await fetch(`${API_BASE_URL}/trips/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tripData)
    })
    if (!response.ok) throw new Error('Failed to update trip')
    return response.json()
  },

  async deleteTrip(id: number) {
    const response = await fetch(`${API_BASE_URL}/trips/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) throw new Error('Failed to delete trip')
  }
}

// Place API calls
export const placeService = {
  async getPlacesByTrip(tripId: number) {
    const response = await fetch(`${API_BASE_URL}/places/trip/${tripId}`)
    if (!response.ok) throw new Error('Failed to fetch places')
    return response.json()
  },

  async getPlaceById(id: number) {
    const response = await fetch(`${API_BASE_URL}/places/${id}`)
    if (!response.ok) throw new Error('Place not found')
    return response.json()
  },

  async createPlace(placeData: any) {
    const response = await fetch(`${API_BASE_URL}/places`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(placeData)
    })
    if (!response.ok) throw new Error('Failed to create place')
    return response.json()
  },

  async updatePlace(id: number, placeData: any) {
    const response = await fetch(`${API_BASE_URL}/places/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(placeData)
    })
    if (!response.ok) throw new Error('Failed to update place')
    return response.json()
  },

  async deletePlace(id: number) {
    const response = await fetch(`${API_BASE_URL}/places/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) throw new Error('Failed to delete place')
  }
}
