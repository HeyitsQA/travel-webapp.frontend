<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { tripService } from '@/services/apiService'
import TripCard from '../components/TripCard.vue'
import type { Trip } from '@/types'

const trips = ref<Trip[]>([])

onMounted(async () => {
  trips.value = await tripService.getAllTrips()
})
</script>

<template>
  <div>
    <TripCard
      v-for="trip in trips"
      :key="trip.tripId"
      :trip="trip"
    />
  </div>
</template>
