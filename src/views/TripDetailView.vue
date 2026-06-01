<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { tripService, placeService } from '@/services/apiService'
import PlaceCard from '@/components/PlaceCard.vue'
import AddPlaceForm from '@/components/AddPlaceForm.vue'
import type { Trip, Place } from '@/types'

const route = useRoute()
const router = useRouter()
const tripId = computed(() => Number(route.params.id))

const trip = ref<Trip | null>(null)
const places = ref<Place[]>([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  await loadTripData()
})

async function loadTripData() {
  loading.value = true
  error.value = ''
  
  try {
    trip.value = await tripService.getTripById(tripId.value)
    places.value = await placeService.getPlacesByTrip(tripId.value)
  } catch (err) {
    error.value = 'Failed to load trip details. Please try again.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

async function handlePlaceAdded(newPlace: Place) {
  places.value.push(newPlace)
}

async function handleUpdatePlace(updatedPlace: Place) {
  try {
    const saved = await placeService.updatePlace(updatedPlace.placeId!, updatedPlace)
    const index = places.value.findIndex(p => p.placeId === updatedPlace.placeId)
    if (index !== -1) {
      places.value[index] = saved
    }
  } catch (err) {
    error.value = 'Failed to update place'
    console.error(err)
  }
}

async function handleDeletePlace(placeId: number) {
  try {
    await placeService.deletePlace(placeId)
    places.value = places.value.filter(p => p.placeId !== placeId)
  } catch (err) {
    error.value = 'Failed to delete place'
    console.error(err)
  }
}

const visitedPlaces = computed(() => places.value.filter(p => p.status === 'visited'))
const plannedPlaces = computed(() => places.value.filter(p => p.status === 'planned'))
const averageRating = computed(() => {
  const rated = places.value.filter(p => p.rating && p.rating > 0)
  if (rated.length === 0) return 0
  return (rated.reduce((sum, p) => sum + (p.rating || 0), 0) / rated.length).toFixed(1)
})

function formatDate(date: string | Date | undefined) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function goBack() {
  router.push('/trips')
}
</script>

<template>
  <div class="trip-detail-container">
    <div v-if="loading" class="loading">
      <p>Loading trip details...</p>
    </div>

    <div v-else-if="error" class="error-banner">
      {{ error }}
      <button @click="loadTripData">Retry</button>
    </div>

    <div v-else-if="trip" class="trip-content">
      <div class="trip-header">
        <button class="btn-back" @click="goBack">← Back to Trips</button>
        <div class="header-content">
          <h1 class="trip-title">{{ trip.name }}</h1>
          <p class="trip-destination">📍 {{ trip.destination }}</p>
          <p class="trip-dates">
            {{ formatDate(trip.startDate) }} — {{ formatDate(trip.endDate) }}
          </p>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-number">{{ places.length }}</div>
          <div class="stat-label">Total Places</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">{{ visitedPlaces.length }}</div>
          <div class="stat-label">Visited</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">{{ plannedPlaces.length }}</div>
          <div class="stat-label">Planned</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">{{ averageRating }}</div>
          <div class="stat-label">Avg Rating</div>
        </div>
      </div>

      <AddPlaceForm :trip-id="tripId" @place-added="handlePlaceAdded" />

      <div class="places-section">
        <div v-if="visitedPlaces.length > 0" class="places-group">
          <h2 class="section-title">✓ Visited Places ({{ visitedPlaces.length }})</h2>
          <div class="places-list">
            <PlaceCard
              v-for="place in visitedPlaces"
              :key="place.placeId"
              :place="place"
              @update:place="handleUpdatePlace"
              @delete="handleDeletePlace"
            />
          </div>
        </div>

        <div v-if="plannedPlaces.length > 0" class="places-group">
          <h2 class="section-title">○ Planned Places ({{ plannedPlaces.length }})</h2>
          <div class="places-list">
            <PlaceCard
              v-for="place in plannedPlaces"
              :key="place.placeId"
              :place="place"
              @update:place="handleUpdatePlace"
              @delete="handleDeletePlace"
            />
          </div>
        </div>

        <div v-if="places.length === 0" class="empty-state">
          <p>No places added yet.</p>
          <p class="empty-hint">Click "Add Place to Trip" above to get started!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.trip-detail-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.loading,
.error-banner {
  text-align: center;
  padding: 40px 20px;
}

.error-banner {
  background: #ffe8e8;
  color: #cc0000;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.error-banner button {
  padding: 8px 16px;
  background: #cc0000;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.trip-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.trip-header {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.btn-back {
  align-self: flex-start;
  padding: 8px 12px;
  background: none;
  border: 1px solid #e8e4dd;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
}

.trip-title {
  margin: 0;
  font-size: 32px;
  font-weight: 700;
}

.trip-destination,
.trip-dates {
  margin: 0;
  color: #555;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
}

.stat-card {
  background: #f9f7f5;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
}

.stat-number {
  font-size: 28px;
  font-weight: 700;
  color: #0066cc;
}

.stat-label {
  font-size: 12px;
  color: #999;
}

.places-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.section-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  padding-bottom: 8px;
  border-bottom: 2px solid #e8e4dd;
}

.places-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: #f9f7f5;
  border-radius: 12px;
  border: 2px dashed #e8e4dd;
}

.empty-hint {
  margin-top: 8px;
  color: #bbb;
  font-size: 13px;
}
</style>
