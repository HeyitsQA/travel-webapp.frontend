// Type definitions for the Travel Logbook app

export interface Trip {
  tripId: number
  name: string
  destination: string
  startDate: Date
  endDate: Date
  status: 'planned' | 'visited'
  description?: string
  userId?: string
  createdAt?: Date
  updatedAt?: Date
  placesCount?: number

}

export interface Place {
  placeId?: number
  trip?: Trip | { tripId: number }
  name: string
  category: string
  status: 'visited' | 'planned'
  notes?: string
  rating?: number // 0-5
  address?:string
  visitDate?: Date | string
  createdAt?: Date
  updatedAt?: Date
}

export interface User {
  userId: string
  username: string
  email: string
  createdAt: Date
}

export interface ApiError {
  message: string
  status: number
}
