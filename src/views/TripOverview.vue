<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { tripService } from '@/services/apiService'  // ← apiService not tripService
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
onMounted(async () => {
  trips.value = await tripService.getAllTrips()
})
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
