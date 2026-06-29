<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { tripService } from '@/services/apiService'
import TripCard from '../components/TripCard.vue'
import type { Trip } from '@/types'

const { user } = useAuth0()
const trips = ref<Trip[]>([])
const searchQuery = ref('')
const showFilters = ref(false)

const selectedStatus = ref('')
const selectedYear = ref('')
const sortBy = ref('newest')

onMounted(async () => {
  if (user.value?.sub) {
    trips.value = await tripService.getAllTrips(user.value.sub)
  }
})

async function handleDelete(id: number) {
  try {
    await tripService.deleteTrip(id)
    trips.value = trips.value.filter(t => t.tripId !== id)
  } catch (err) {
    alert('Failed to delete trip. Please try again.')
  }
}

const availableYears = computed(() => {
  return [...new Set(
    trips.value.map(trip =>
      new Date(trip.startDate).getFullYear()
    )
  )].sort((a, b) => b - a)
})

const filteredTrips = computed(() => {
  let result = [...trips.value]

  // Search
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()

    result = result.filter(trip =>
      trip.name.toLowerCase().includes(query) ||
      trip.destination.toLowerCase().includes(query)
    )
  }

  // Status
  if (selectedStatus.value) {
    result = result.filter(
      trip => trip.status === selectedStatus.value
    )
  }

  // Year
  if (selectedYear.value) {
    result = result.filter(
      trip =>
        new Date(trip.startDate).getFullYear().toString() ===
        selectedYear.value
    )
  }

  // Sorting
  switch (sortBy.value) {
    case 'oldest':
      result.sort((a, b) =>
        new Date(a.startDate).getTime() -
        new Date(b.startDate).getTime()
      )
      break

    case 'name-asc':
      result.sort((a, b) =>
        a.name.localeCompare(b.name)
      )
      break

    case 'name-desc':
      result.sort((a, b) =>
        b.name.localeCompare(a.name)
      )
      break

    default:
      result.sort((a, b) =>
        new Date(b.startDate).getTime() -
        new Date(a.startDate).getTime()
      )
  }

  return result
})
</script>

<template>
  <div class="trip-overview">

    <div class="search-filter-bar">
      <input
        v-model="searchQuery"
        class="search-input"
        type="text"
        placeholder="🔍 Search trips..."
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
        <label>Year</label>

        <select v-model="selectedYear">
          <option value="">All</option>

          <option
            v-for="year in availableYears"
            :key="year"
            :value="year"
          >
            {{ year }}
          </option>
        </select>
      </div>

      <div class="filter-group">
        <label>Sort</label>

        <select v-model="sortBy">
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="name-asc">Name A–Z</option>
          <option value="name-desc">Name Z–A</option>
        </select>
      </div>
    </div>

    <div class="results-info">
      Showing {{ filteredTrips.length }}
      of {{ trips.length }} trips
    </div>

    <div
      v-if="filteredTrips.length > 0"
      class="trip-list"
    >
      <TripCard
        v-for="trip in filteredTrips"
        :key="trip.tripId"
        :trip="trip"
        @delete="handleDelete"
      />
    </div>

    <div
      v-else
      class="empty-state"
    >
      <p>No trips match your filters.</p>
    </div>

  </div>
</template>

<style scoped>
.trip-overview {
  display: flex;
  flex-direction: column;
}

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
  font-weight: 600;
  color: var(--muted);
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
  font-size: 13px;
  color: var(--muted);
}

.trip-list {
  display: flex;
  flex-direction: column;
}

.empty-state {
  text-align: center;
  padding: 48px 20px;
  background: var(--surface);
  border: 2px dashed var(--border);
  border-radius: 12px;
}
</style>
