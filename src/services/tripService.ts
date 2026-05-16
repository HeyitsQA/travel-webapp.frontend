const API_URL = 'https://travel-webapp-o55t.onrender.com/api/trips'

export async function fetchTrip(id: number) {
const response = await fetch(`${API_URL}/${id}`)
if (!response.ok) throw new Error('Trip not found')
return response.json()
}

export async function fetchAllTrips() {
const response = await fetch(API_URL)
if (!response.ok) throw new Error('Failed to fetch trips')
return response.json()
}
