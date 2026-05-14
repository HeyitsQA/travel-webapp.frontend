<script lang="ts" setup>
import { ref } from 'vue'
import TripCard from '../components/TripCard.vue'

const trips = ref([
  {
    id: 1,
    name: 'Berlin Trip',
    status: 'planned',
    startDate: '2026-06-01',
    endDate: '2026-06-05',
    location: 'Berlin',
    placesCount: 5
  }
])
</script>

<template>
  <div>
    <TripCard
      v-for="trip in trips"
      :key="trip.id"
      :trip="trip"
    />
  </div>
</template>
