<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchTrip } from '@/services/tripService'

interface Trip {
  id: number
  name: string
  status: string
  startDate: string
  endDate: string
  description: string
}

const route = useRoute()
const trip = ref<Trip | null>(null)

onMounted(async () => {
  trip.value = await fetchTrip(Number(route.params.id))
})
</script>

<template>
  <div v-if="trip">
    <h1>{{ trip.name }}</h1>
    <p>📅 {{ trip.startDate }} → {{ trip.endDate }}</p>
    <p>{{ trip.description }}</p>
  </div>

  <div v-else>
    <p>Loading...</p>
  </div>
</template>
