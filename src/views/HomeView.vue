<template>
  <div class="container">
    <div class="card content">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />

      <h1 class="title">Welcome to the Travel Journal</h1>

      <div class="actions">
        <Button fullWidth @click="goToTrips">
          Trip Overview
        </Button>

        <Button variant="secondary" fullWidth @click="createTrip">
          Create Trip
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Button from '@/components/UI/Button.vue'

const router = useRouter()

function goToTrips() {
  router.push('/trips')
}

function createTrip() {
  router.push('/trips/new')
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--bg);
  padding: 2rem;
}

.content {
  text-align: center;
  max-width: 520px;
  width: 100%;
  min-height: 60vh;
  padding: 3rem;
}

.logo {
  width: 160px;
  margin-bottom: 16px;
}

.title {
  font-size: 25px;
  font-weight: 500;
  margin-bottom: 24px;
  color: var(--text);
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
