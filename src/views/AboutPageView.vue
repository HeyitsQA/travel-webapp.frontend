<script setup lang="ts">
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

<template>
  <div class="about-page">
    <div class="card content">
      <h1 class="title">Welcome to Travel Journal App</h1>
      <p class="subtitle">
        Plan your next trips or write down your memorable trips.
      </p>

      <div class="section">
        <h2 class="section-title">All you can do</h2>
        <ul class="feature-list">
          <li>
            <span class="icon">✈️</span>
            <div>
              <strong>Create a trip</strong>
              <p>Give it a name, destination, dates, status, and a short description.</p>
            </div>
          </li>
          <li>
            <span class="icon">📍</span>
            <div>
              <strong>Add places</strong>
              <p>Save landmarks, cafés, restaurants, and activities with notes, ratings, addresses, and visit dates.</p>
            </div>
          </li>
          <li>
            <span class="icon">📝</span>
            <div>
              <strong>Edit anytime</strong>
              <p>Update the trip description or edit a place's details as your plans change.</p>
            </div>
          </li>
          <li>
            <span class="icon">🔍</span>
            <div>
              <strong>Search &amp; filter</strong>
              <p>Search by name or destination, and filter by status, year, category, or rating.</p>
            </div>
          </li>
          <li>
            <span class="icon">📊</span>
            <div>
              <strong>See your stats</strong>
              <p>Each trip shows total places, how many you've visited vs. planned, and your average rating.</p>
            </div>
          </li>
          <li>
            <span class="icon">🗑️</span>
            <div>
              <strong>Clean up</strong>
              <p>Delete trips or individual places whenever you want.</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="actions">
        <Button fullWidth @click="createTrip">
          Start a new trip
        </Button>
        <Button variant="secondary" fullWidth @click="goToTrips">
          Browse my trips
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  display: flex;
  justify-content: center;
  padding: 2rem;
  background: var(--bg);
  min-height: calc(100vh - 60px);
}

.content {
  max-width: 720px;
  width: 100%;
  padding: 2.5rem;
}

.title {
  font-size: 32px;
  font-weight: 600;
  margin: 0 0 12px;
  color: var(--text);
}

.subtitle {
  font-size: 16px;
  color: var(--muted);
  margin: 0 0 32px;
  line-height: 1.5;
}

.section {
  margin-bottom: 32px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 16px;
  color: var(--text);
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.feature-list li {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 14px 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  transition: border-color 0.2s, transform 0.2s;
}

.feature-list li:hover {
  border-color: var(--pink);
  transform: translateY(-1px);
}

.icon {
  font-size: 22px;
  line-height: 1;
  flex-shrink: 0;
}

.feature-list strong {
  display: block;
  font-size: 14px;
  color: var(--text);
  margin-bottom: 2px;
}

.feature-list p {
  margin: 0;
  font-size: 13px;
  color: var(--muted);
  line-height: 1.5;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
