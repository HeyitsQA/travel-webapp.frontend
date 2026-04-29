<template>
  <div class="card trip-card" @click="$emit('select', trip)">
    <div class="header">
      <h2 class="title">{{ trip.name }}</h2>

      <span class="pill" :class="statusClass">
        {{ trip.status }}
      </span>
    </div>

    <p class="dates">
      {{ formatDate(trip.startDate) }} – {{ formatDate(trip.endDate) }}
    </p>

    <p class="meta">
      {{ trip.location }}
    </p>

    <div class="footer">
      <span class="muted">
        {{ trip.placesCount }} places
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  trip: {
    type: Object,
    required: true
  }
})

defineEmits(['select'])

const statusClass = computed(() => {
  return props.trip.status === 'planned'
    ? 'accent-blue'
    : 'accent-green'
})

function formatDate(date) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<style scoped>
.trip-card {
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.trip-card:hover {
  transform: translateY(-2px);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.title {
  font-size: 18px;
  margin: 0;
  color: var(--text);
}

.dates {
  font-size: 13px;
  margin: 6px 0;
  color: var(--muted);
}

.meta {
  font-size: 13px;
  margin: 0;
  color: var(--muted);
}

.footer {
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
}

.muted {
  font-size: 12px;
  color: var(--muted);
}
</style>
