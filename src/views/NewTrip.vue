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
  status: 'planned',
  description: '',
  notes: '',
  tags: '',
  budget: ''
})

function handleSubmit() {
  const tripData = {
    ...form,
    tags: form.tags.split(',').map(t => t.trim()).filter(Boolean)
  }
  console.log('New trip:', tripData)
  router.push('/trips')
}

function goBack() {
  router.push('/')
}
</script>

<template>
    <div class="container">
      <div class="card content">
        <h1 class="title">New Trip</h1>

        <div class="form">
          <div class="row">
            <div class="field">
              <label>Trip Name</label>
              <input v-model="form.name" type="text" placeholder="e.g. Tokyo Summer" />
            </div>
            <div class="field">
              <label>Location</label>
              <input v-model="form.location" type="text" placeholder="e.g. Tokyo, Japan" />
            </div>
          </div>

          <div class="row">
            <div class="field">
              <label>Start Date</label>
              <input v-model="form.startDate" type="date" />
            </div>
            <div class="field">
              <label>End Date</label>
              <input v-model="form.endDate" type="date" />
            </div>
          </div>

          <div class="field">
            <label>Status</label>
            <select v-model="form.status">
              <option value="planned">Planned</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div class="field">
            <label>Description</label>
            <textarea v-model="form.description" placeholder="What's this trip about?" rows="3" />
          </div>

          <div class="field">
            <label>Notes</label>
            <textarea v-model="form.notes" placeholder="Reminders, tips, todos, " rows="3" />
          </div>

          <div class="field">
            <label>Tags</label>
            <input v-model="form.tags" type="text" placeholder="culture, food, adventure" />
            <span class="hint">Separate tags with commas</span>
          </div>

          <div class="field">
            <label>Budget (€)</label>
            <input v-model="form.budget" type="number" placeholder="e.g. 1200" min="0" />
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
  max-width: 680px;
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
.row {
  display: flex;
  gap: 12px;
}

.row .field {
  flex: 1;
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
.field textarea {
  padding: 12px 16px;
  border-radius: 14px;
  border: 1.5px solid var(--border);
  background: var(--surface);
  font-size: 14px;
  color: var(--text);
  outline: none;
  font-family: var(--font-sans);
  resize: vertical;
}

.field textarea:focus {
  border-color: var(--pink);
}

.hint {
  font-size: 11px;
  color: var(--muted);
  margin-top: 2px;
}

.field input:focus,
.field select:focus {
  border-color: var(--pink);
}
</style>
