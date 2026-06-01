<template>
  <RouterLink :to="{ name: 'trip-detail', params: { id: trip.tripId } }" class="card-link">
    <div class="card trip-card">
      <div class="header">
        <h2 class="title">{{ trip.name }}</h2>
        <span class="pill" :class="statusClass">{{ trip.status }}</span>
      </div>
      <p class="dates">{{ formatDate(trip.startDate) }} – {{ formatDate(trip.endDate) }}</p>
      <p class="meta">📍 {{ trip.destination }}</p>
      <div class="footer">
        <span class="muted">{{ trip.placesCount ?? 0 }} places</span>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({ trip: { type: Object, required: true } })

const statusClass = computed(() =>
  props.trip.status === 'planned' ? 'accent-blue' : 'accent-green'
)

function formatDate(date: string) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('de-DE', { year: 'numeric', month: 'short', day: 'numeric' })
}
</script>

<style scoped>
.card-link {
  text-decoration: none;
  display: block;
  color: inherit;
}
.card-link::after { display: none; }

.trip-card {
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin-bottom: 12px;
}
.trip-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.title { font-size: 18px; margin: 0; color: var(--text); }
.dates { font-size: 13px; margin: 6px 0; color: var(--muted); }
.meta { font-size: 13px; margin: 0; color: var(--muted); }
.footer { margin-top: 12px; display: flex; justify-content: flex-end; }
.muted { font-size: 12px; color: var(--muted); }
</style>
