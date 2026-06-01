<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { tripService } from '@/services/apiService'

const router = useRouter()
const loading = ref(false)
const error = ref('')

const form = reactive({
  name: '',
  destination: '',
  startDate: '',
  endDate: '',
  status: 'planned',
  description: ''
})

async function handleSubmit() {
  if (!form.name.trim()) {
    error.value = 'Trip name is required'
    return
  }
  if (!form.destination.trim()) {
    error.value = 'Destination is required'
    return
  }
  if (!form.startDate || !form.endDate) {
    error.value = 'Start and end dates are required'
    return
  }

  loading.value = true
  error.value = ''

  try {
    const newTrip = await tripService.createTrip({
      name: form.name,
      destination: form.destination,
      startDate: form.startDate,
      endDate: form.endDate,
      status: form.status,
      description: form.description
    })

    console.log('✅ Trip saved successfully:', newTrip)
    router.push(`/trips/${newTrip.tripId}`)
  } catch (err) {
    error.value = 'Failed to create trip. Please try again.'
    console.error('❌ Error:', err)
  } finally {
    loading.value = false
  }
}

function goBack() {
  router.push('/')
}
</script>

<template>
  <div class="container">
    <div class="card content">
      <h1 class="title">New Trip</h1>

      <div v-if="error" class="error-message">
        ⚠️ {{ error }}
      </div>

      <div class="form">
        <div class="row">
          <div class="field">
            <label>Trip Name *</label>
            <input
              v-model="form.name"
              type="text"
              placeholder="e.g. Tokyo Summer"
              required
            />
          </div>
          <div class="field">
            <label>Destination *</label>
            <input
              v-model="form.destination"
              type="text"
              placeholder="e.g. Tokyo, Japan"
              required
            />
          </div>
        </div>

        <div class="row">
          <div class="field">
            <label>Start Date *</label>
            <input v-model="form.startDate" type="date" required />
          </div>
          <div class="field">
            <label>End Date *</label>
            <input v-model="form.endDate" type="date" required />
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
          <textarea
            v-model="form.description"
            placeholder="What's this trip about?"
            rows="3"
          />
        </div>

        <button
          class="btn-submit"
          @click="handleSubmit"
          :disabled="loading"
        >
          {{ loading ? 'Saving...' : 'Save Trip' }}
        </button>
        <button class="btn-cancel" @click="goBack">Cancel</button>
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
  background: #f5f5f5;
  padding: 2rem;
}

.content {
  max-width: 680px;
  width: 100%;
  background: white;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 24px;
}

.error-message {
  background: #ffe8e8;
  color: #cc0000;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 16px;
  font-size: 13px;
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
}

.field input,
.field select,
.field textarea {
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  font-size: 14px;
  font-family: inherit;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  outline: none;
  border-color: #0066cc;
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
}

.btn-submit,
.btn-cancel {
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-submit {
  background: #0066cc;
  color: white;
}

.btn-submit:hover:not(:disabled) {
  background: #0052a3;
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-cancel {
  background: #f0f0f0;
  color: #666;
}

.btn-cancel:hover {
  background: #e0e0e0;
}
</style>
