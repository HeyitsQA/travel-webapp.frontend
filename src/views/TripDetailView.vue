<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { tripService, placeService } from '@/services/apiService'
import PlaceCard from '@/components/PlaceCard.vue'
import AddPlaceForm from '@/components/AddPlaceForm.vue'
import type { Trip, Place } from '@/types'
import {
  cloneExampleTrip,
  cloneExamplePlaces,
  isExampleTripId,
} from '@/mocks/exampleTrip'

const route = useRoute()
const router = useRouter()
const tripId = computed(() => Number(route.params.id))
const isExample = computed(() => isExampleTripId(tripId.value))
let nextExamplePlaceId = -200

const trip = ref<Trip | null>(null)
const places = ref<Place[]>([])
const loading = ref(true)
const error = ref('')
const searchQuery = ref('')
const showFilters = ref(false)

const isEditingDescription = ref(false)
const editedDescription = ref('')
const savingDescription = ref(false)

const selectedStatus = ref('')
const selectedCategory = ref('')
const selectedRating = ref('')
const sortBy = ref('newest')

onMounted(async () => {
  await loadTripData()
})

async function loadTripData() {
  loading.value = true
  error.value = ''

  if (isExample.value) {
    trip.value = cloneExampleTrip()
    places.value = cloneExamplePlaces()
    loading.value = false
    return
  }

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
  if (isExample.value && newPlace.placeId == null) {
    newPlace.placeId = nextExamplePlaceId--
  }
  places.value.push(newPlace)
}

async function handleUpdatePlace(updatedPlace: Place) {
  if (isExample.value) {
    const index = places.value.findIndex(p => p.placeId === updatedPlace.placeId)
    if (index !== -1) places.value[index] = { ...updatedPlace }
    return
  }
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
  if (isExample.value) {
    places.value = places.value.filter(p => p.placeId !== placeId)
    return
  }
  try {
    await placeService.deletePlace(placeId)
    places.value = places.value.filter(p => p.placeId !== placeId)
  } catch (err) {
    error.value = 'Failed to delete place'
    console.error(err)
  }
}

function startEditDescription() {
  if (!trip.value) return
  editedDescription.value = trip.value.description ?? ''
  isEditingDescription.value = true
}

function cancelEditDescription() {
  isEditingDescription.value = false
  editedDescription.value = ''
}

async function saveDescription() {
  if (!trip.value) return
  savingDescription.value = true
  error.value = ''

  if (isExample.value) {
    trip.value = { ...trip.value, description: editedDescription.value }
    isEditingDescription.value = false
    savingDescription.value = false
    return
  }

  try {
    const updated = await tripService.updateTrip(trip.value.tripId, {
      ...trip.value,
      description: editedDescription.value
    })
    trip.value = updated
    isEditingDescription.value = false
  } catch (err) {
    error.value = 'Failed to update description'
    console.error(err)
  } finally {
    savingDescription.value = false
  }
}

async function handleDeleteTrip() {
  if (!confirm('Do you really want to delete this trip?')) return

  if (isExample.value) {
    router.push('/trips')
    return
  }

  try {
    await tripService.deleteTrip(tripId.value)
    router.push('/trips')
  } catch (err) {
    error.value = 'Failed to delete trip'
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

const availableCategories = computed(() => {
  return [...new Set(
    places.value
      .map(place => place.category)
      .filter(Boolean)
  )].sort()
})

const filteredPlaces = computed(() => {
  let result = [...places.value]

  // Search
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()

    result = result.filter(place =>
      place.name.toLowerCase().includes(query) ||
      place.category?.toLowerCase().includes(query) ||
      place.notes?.toLowerCase().includes(query) ||
      place.address?.toLowerCase().includes(query)
    )
  }

  // Status
  if (selectedStatus.value) {
    result = result.filter(
      place => place.status === selectedStatus.value
    )
  }

  // Category
  if (selectedCategory.value) {
    result = result.filter(
      place => place.category === selectedCategory.value
    )
  }

  // Rating
  if (selectedRating.value) {
    const minimumRating = Number(selectedRating.value)

    result = result.filter(
      place => (place.rating ?? 0) >= minimumRating
    )
  }

  // Sorting
  switch (sortBy.value) {
    case 'oldest':
      result.sort((a, b) =>
        new Date(a.visitDate ?? 0).getTime() -
        new Date(b.visitDate ?? 0).getTime()
      )
      break

    case 'highest-rating':
      result.sort(
        (a, b) => (b.rating ?? 0) - (a.rating ?? 0)
      )
      break

    case 'lowest-rating':
      result.sort(
        (a, b) => (a.rating ?? 0) - (b.rating ?? 0)
      )
      break

    case 'name':
      result.sort((a, b) =>
        a.name.localeCompare(b.name)
      )
      break

    default:
      result.sort((a, b) =>
        new Date(b.visitDate ?? 0).getTime() -
        new Date(a.visitDate ?? 0).getTime()
      )
  }

  return result
})

const hasActiveFilters = computed(() =>
  searchQuery.value ||
  selectedStatus.value ||
  selectedCategory.value ||
  selectedRating.value
)
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
          <div class="title-row">
            <h1 class="trip-title">{{ trip.name }}</h1>
            <span v-if="isExample" class="example-badge">Preview — not saved</span>
            <button class="btn-delete-trip" @click="handleDeleteTrip">🗑️ Delete Trip</button>
          </div>
          <p class="trip-destination">📍 {{ trip.destination }}</p>
          <p class="trip-dates">
            {{ formatDate(trip.startDate) }} — {{ formatDate(trip.endDate) }}
          </p>

          <div class="description-block">
            <div v-if="!isEditingDescription" class="description-view">
              <p v-if="trip.description" class="trip-description">{{ trip.description }}</p>
              <p v-else class="trip-description-empty">No description yet.</p>
              <button class="btn-edit-description" @click="startEditDescription">
                {{ trip.description ? 'Edit description' : 'Add description' }}
              </button>
            </div>

            <div v-else class="description-edit">
              <textarea
                v-model="editedDescription"
                class="description-textarea"
                rows="3"
                placeholder="What's this trip about?"
              />
              <div class="description-actions">
                <button
                  class="btn-save-description"
                  :disabled="savingDescription"
                  @click="saveDescription"
                >
                  {{ savingDescription ? 'Saving...' : 'Save' }}
                </button>
                <button
                  class="btn-cancel-description"
                  :disabled="savingDescription"
                  @click="cancelEditDescription"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
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

        <div class="search-filter-bar">
          <input
            v-model="searchQuery"
            class="search-input"
            type="text"
            placeholder="🔍 Search places..."
          />

          <button
            class="filter-toggle"
            @click="showFilters = !showFilters"
          >
            ⚙️ Filters
          </button>
        </div>

        <div
          v-if="showFilters"
          class="filters-panel"
        >
          <div class="filter-group">
            <label>Status</label>

            <select v-model="selectedStatus">
              <option value="">All</option>
              <option value="planned">Planned</option>
              <option value="visited">Visited</option>
            </select>
          </div>

          <div class="filter-group">
            <label>Category</label>

            <select v-model="selectedCategory">
              <option value="">All</option>

              <option
                v-for="category in availableCategories"
                :key="category"
                :value="category"
              >
                {{ category }}
              </option>
            </select>
          </div>

          <div class="filter-group">
            <label>Rating</label>

            <select v-model="selectedRating">
              <option value="">All</option>
              <option value="5">5★</option>
              <option value="4">4★+</option>
              <option value="3">3★+</option>
              <option value="2">2★+</option>
              <option value="1">1★+</option>
            </select>
          </div>

          <div class="filter-group">
            <label>Sort</label>

            <select v-model="sortBy">
              <option value="newest">Newest Visit</option>
              <option value="oldest">Oldest Visit</option>
              <option value="highest-rating">Highest Rating</option>
              <option value="lowest-rating">Lowest Rating</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>
        </div>

        <div class="results-info">
          Showing {{ filteredPlaces.length }}
          of {{ places.length }} places
        </div>

        <div
          v-if="filteredPlaces.length > 0"
          class="places-list"
        >
          <PlaceCard
            v-for="place in filteredPlaces"
            :key="place.placeId"
            :place="place"
            @update:place="handleUpdatePlace"
            @delete="handleDeletePlace"
          />
        </div>

        <div
          v-else
          class="empty-state"
        >
          <p>No places match your filters.</p>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.trip-detail-container { max-width: 900px; margin: 0 auto; padding: 20px; }
.loading, .error-banner { text-align: center; padding: 40px 20px; }
.error-banner {
  background: #ffe8e8; color: #cc0000;
  border-radius: 12px; padding: 16px 20px;
  display: flex; justify-content: space-between; align-items: center;
}
.error-banner button {
  padding: 8px 16px; background: #cc0000; color: white;
  border: none; border-radius: 6px; cursor: pointer;
}
.trip-content { display: flex; flex-direction: column; gap: 24px; }
.trip-header { display: flex; flex-direction: column; gap: 12px; }
.btn-back {
  align-self: flex-start; padding: 8px 14px;
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 8px; cursor: pointer; font-size: 13px;
  color: var(--text); transition: border-color 0.2s;
}
.btn-back:hover { border-color: var(--pink); }
.trip-title { margin: 0; font-size: 32px; }
.title-row {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.example-badge {
  padding: 4px 10px;
  background: var(--lavender, #e6e0ff);
  color: var(--text);
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.btn-delete-trip {
  padding: 8px 14px;
  background: #ffe8e8;
  color: #cc0000;
  border: 1px solid #ffcccc;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-delete-trip:hover {
  background: #cc0000;
  color: white;
  border-color: #cc0000;
}
.trip-destination, .trip-dates { margin: 0; color: var(--muted); }
.trip-description { margin: 0; color: var(--text); line-height: 1.5; white-space: pre-wrap; }
.description-block { margin-top: 8px; }
.description-view { display: flex; flex-direction: column; align-items: flex-start; gap: 6px; }
.trip-description-empty { margin: 0; color: var(--muted); font-style: italic; font-size: 13px; }
.btn-edit-description {
  padding: 4px 10px; background: transparent; color: var(--muted);
  border: 1px solid var(--border); border-radius: 6px; cursor: pointer;
  font-size: 12px; transition: border-color 0.2s, color 0.2s;
}
.btn-edit-description:hover { border-color: var(--pink); color: var(--text); }
.description-edit { display: flex; flex-direction: column; gap: 8px; }
.description-textarea {
  padding: 10px 12px; border: 1px solid var(--border); border-radius: 8px;
  background: var(--surface); color: var(--text);
  font-family: var(--font-sans); font-size: 14px; resize: vertical;
}
.description-textarea:focus {
  outline: none; border-color: var(--pink); box-shadow: 0 0 0 3px rgba(247, 182, 200, 0.2);
}
.description-actions { display: flex; gap: 8px; }
.btn-save-description {
  padding: 6px 14px; background: var(--pink); color: var(--text);
  border: none; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer;
}
.btn-save-description:disabled { opacity: 0.6; cursor: not-allowed; }
.btn-cancel-description {
  padding: 6px 14px; background: var(--surface); color: var(--muted);
  border: 1px solid var(--border); border-radius: 6px; font-size: 13px; cursor: pointer;
}
.btn-cancel-description:hover:not(:disabled) { border-color: var(--pink); }
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; }
.stat-card { background: var(--surface); border: 1px solid var(--border); padding: 20px; border-radius: 12px; text-align: center; }
.stat-number { font-size: 28px; font-weight: 700; color: var(--text); font-family: var(--font-serif); }
.stat-label { font-size: 12px; color: var(--muted); margin-top: 4px; }
.places-section { display: flex; flex-direction: column; gap: 24px; }
.section-title { margin: 0 0 12px; font-size: 18px; padding-bottom: 8px; border-bottom: 1px solid var(--border); }
.places-list { display: flex; flex-direction: column; gap: 8px; }
.empty-state { text-align: center; padding: 60px 20px; background: var(--surface); border-radius: 12px; border: 2px dashed var(--border); }
.empty-hint { margin-top: 8px; color: var(--muted); font-size: 13px; }
.search-filter-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.search-input {
  flex: 1;
  padding: 12px 14px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--surface);
  color: var(--text);
  font-size: 14px;
}

.search-input:focus {
  outline: none;
  border-color: var(--pink);
  box-shadow: 0 0 0 3px rgba(247, 182, 200, 0.2);
}

.filter-toggle {
  padding: 12px 16px;
  border: 1px solid var(--border);
  background: var(--surface);
  border-radius: 10px;
  cursor: pointer;
  color: var(--text);
}

.filter-toggle:hover {
  border-color: var(--pink);
}

.filters-panel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
  padding: 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.filter-group label {
  font-size: 12px;
  color: var(--muted);
  font-weight: 600;
}

.filter-group select {
  padding: 10px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface);
  color: var(--text);
}

.results-info {
  margin-bottom: 12px;
  color: var(--muted);
  font-size: 13px;
}
</style>
