<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { tripService } from '@/services/apiService'

const router = useRouter()
const loading = ref(false)
const error = ref('')

const form = reactive({
  name: '', destination: '', startDate: '', endDate: '',
  status: 'planned', description: ''
})

async function handleSubmit() {
  if (!form.name.trim()) { error.value = 'Trip name is required'; return }
  if (!form.destination.trim()) { error.value = 'Destination is required'; return }
  if (!form.startDate || !form.endDate) { error.value = 'Start and end dates are required'; return }

  loading.value = true
  error.value = ''
  try {
    const newTrip = await tripService.createTrip({ ...form })
    router.push(`/trips/${newTrip.tripId}`)
  } catch (err) {
    error.value = 'Failed to create trip. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="page">
    <div class="card content">
      <h1>New Trip</h1>
      <div v-if="error" class="error-message">⚠️ {{ error }}</div>
      <div class="form">
        <div class="row">
          <div class="field">
            <label>Trip Name *</label>
            <input v-model="form.name" type="text" placeholder="e.g. Tokyo Summer" />
          </div>
          <div class="field">
            <label>Destination *</label>
            <input v-model="form.destination" type="text" placeholder="e.g. Tokyo, Japan" />
          </div>
        </div>
        <div class="row">
          <div class="field">
            <label>Start Date *</label>
            <input v-model="form.startDate" type="date" />
          </div>
          <div class="field">
            <label>End Date *</label>
            <input v-model="form.endDate" type="date" />
          </div>
        </div>
        <div class="field">
          <label>Status</label>
          <select v-model="form.status">
            <option value="planned">Planned</option>
            <option value="visited">Visited</option>
          </select>
        </div>
        <div class="field">
          <label>Description</label>
          <textarea v-model="form.description" placeholder="What's this trip about?" rows="3" />
        </div>
        <div class="actions">
          <button class="btn-primary" @click="handleSubmit" :disabled="loading">
            {{ loading ? 'Saving...' : 'Save Trip' }}
          </button>
          <button class="btn-secondary" @click="router.push('/')">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  padding: 2rem;
}
.content {
  max-width: 680px;
  width: 100%;
}
h1 { margin-bottom: 24px; }
.error-message {
  background: #ffe8e8;
  color: #cc0000;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 13px;
}
.form { display: flex; flex-direction: column; gap: 16px; }
.row { display: flex; gap: 12px; }
.row .field { flex: 1; }
.field { display: flex; flex-direction: column; gap: 6px; }
.field label { font-size: 13px; font-weight: 600; color: var(--text); }
.field input, .field select, .field textarea {
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid var(--border);
  font-size: 14px;
  font-family: var(--font-sans);
  background: var(--surface);
  color: var(--text);
}
.field input:focus, .field select:focus, .field textarea:focus {
  outline: none;
  border-color: var(--pink);
  box-shadow: 0 0 0 3px rgba(247, 182, 200, 0.2);
}
.actions { display: flex; gap: 12px; }
.btn-primary {
  flex: 1;
  padding: 12px 16px;
  background: var(--pink);
  color: var(--text);
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}
.btn-primary:hover:not(:disabled) { opacity: 0.85; }
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-secondary {
  flex: 1;
  padding: 12px 16px;
  background: var(--surface);
  color: var(--muted);
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.2s;
}
.btn-secondary:hover { border-color: var(--pink); }
</style>
