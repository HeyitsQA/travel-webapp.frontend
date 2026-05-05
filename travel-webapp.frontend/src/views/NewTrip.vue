<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import Button from '@/components/UI/Button.vue'

const router = useRouter()

const form = reactive({
  name: '',
  location: '',
  startDate: '',
  endDate: '',
  status: 'planned'
})

function handleSubmit() {
  // TODO: save to backend later
  console.log('New trip:', form)
  router.push('/trips')
}

function goBack() {
  router.push('/trips')
}
</script>

<template>
    <div class="container">
      <div class="card content">
        <h1 class="title">Log New Trip</h1>

        <div class="form">
          <div class="field">
            <label>Trip Name</label>
            <input v-model="form.name" type="text" placeholder="e.g. Tokyo Summer" />
          </div>

          <div class="field">
            <label>Location</label>
            <input v-model="form.location" type="text" placeholder="e.g. Tokyo, Japan" />
          </div>

          <div class="field">
            <label>Start Date</label>
            <input v-model="form.startDate" type="date" />
          </div>

          <div class="field">
            <label>End Date</label>
            <input v-model="form.endDate" type="date" />
          </div>

          <div class="field">
            <label>Status</label>
            <select v-model="form.status">
              <option value="planned">Planned</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <Button fullWidth @click="handleSubmit">Save Trip</Button>
          <Button variant="secondary" fullWidth @click="goBack">Cancel</Button>
        </div>
      </div>
    </div>
</template>

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
  max-width: 420px;
  width: 100%;
}

.title {
  font-size: 22px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 24px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
}

.field input,
.field select {
  padding: 12px 16px;
  border-radius: 14px;
  border: 1.5px solid var(--border);
  background: var(--surface);
  font-size: 14px;
  color: var(--text);
  outline: none;
  font-family: var(--font-sans);
}

.field input:focus,
.field select:focus {
  border-color: var(--pink);
}
</style>
