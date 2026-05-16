<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchTrip } from '../services/tripService'

const route = useRoute()
const trip = ref(null)

onMounted(async () => {
  trip.value = await fetchTrip(Number(route.params.id))
})
</script>

<template>
  <div v-if="trip">
    <h1>{{ trip.title }}</h1>
    <p>📍 {{ trip.destination }}</p>
    <p>📅 {{ trip.startDate }} → {{ trip.endDate }}</p>
    <p>{{ trip.description }}</p>
  </div>

  <div v-else>
    <p>Loading...</p>
  </div>
</template>
