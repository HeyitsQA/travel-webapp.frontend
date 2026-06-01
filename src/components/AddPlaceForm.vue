<script setup lang="ts">
import { ref } from 'vue'
import { placeService } from '@/services/apiService'
import type { Place } from '@/types'

const props = defineProps<{
  tripId: number
}>()

const emit = defineEmits(['place-added'])

const isOpen = ref(false)
const loading = ref(false)
const error = ref('')

const formData = ref<Partial<Place>>({
  name: '',
  category: '',
  status: 'planned',
  notes: '',
  rating: 0,
  latitude: undefined,
  longitude: undefined,
  visitDate: undefined
})

async function submitForm() {
  if (!formData.value.name?.trim()) {
    error.value = 'Please enter a place name'
    return
  }

  loading.value = true
  error.value = ''

  try {
    const newPlace = await placeService.createPlace({
      ...formData.value,
      trip: { tripId: props.tripId }
    })

    emit('place-added', newPlace)
    resetForm()
    isOpen.value = false
  } catch (err) {
    error.value = 'Failed to create place. Please try again.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

function resetForm() {
  formData.value = {
    name: '',
    category: '',
    status: 'planned',
    notes: '',
    rating: 0,
    latitude: undefined,
    longitude: undefined,
    visitDate: undefined
  }
}

function toggleForm() {
  isOpen.value = !isOpen.value
  if (!isOpen.value) {
    resetForm()
    error.value = ''
  }
}
</script>

<template>
  <div class="add-place-section">
    <button v-if="!isOpen" class="btn-add-place" @click="toggleForm">
      + Add Place to Trip
    </button>

    <div v-else class="place-form-container">
      <div class="form-header">
        <h3>Add a New Place</h3>
        <button class="close-btn" @click="toggleForm">✕</button>
      </div>

      <div v-if="error" class="error-message">{{ error }}</div>

      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label>Place Name *</label>
          <input
            v-model="formData.name"
            type="text"
            placeholder="e.g., Eiffel Tower, Central Cafe"
            required
          />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Category</label>
            <select v-model="formData.category">
              <option value="">Select category</option>
              <option value="Restaurant">🍽️ Restaurant</option>
              <option value="Landmark">🏛️ Landmark</option>
              <option value="Café">☕ Café</option>
              <option value="Accommodation">🏨 Accommodation</option>
              <option value="Activity">🎭 Activity</option>
              <option value="Other">📍 Other</option>
            </select>
          </div>

          <div class="form-group">
            <label>Status</label>
            <select v-model="formData.status">
              <option value="planned">📌 Planned</option>
              <option value="visited">✓ Visited</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Rating (0-5)</label>
            <div class="rating-stars">
              <button
                v-for="star in 5"
                :key="star"
                type="button"
                class="star-btn"
                :class="{ active: formData.rating && formData.rating >= star }"
                @click="formData.rating = star"
              >
                ⭐
              </button>
              <span v-if="formData.rating" class="rating-text">{{ formData.rating }}/5</span>
            </div>
          </div>

          <div class="form-group">
            <label>Visit Date</label>
            <input v-model="formData.visitDate" type="datetime-local" />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Latitude</label>
            <input
              v-model.number="formData.latitude"
              type="number"
              placeholder="e.g., 48.8584"
              step="0.0001"
            />
          </div>

          <div class="form-group">
            <label>Longitude</label>
            <input
              v-model.number="formData.longitude"
              type="number"
              placeholder="e.g., 2.2945"
              step="0.0001"
            />
          </div>
        </div>

        <div class="form-group">
          <label>Notes</label>
          <textarea
            v-model="formData.notes"
            placeholder="Your thoughts, recommendations, or memories..."
            rows="3"
          ></textarea>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-submit" :disabled="loading">
            {{ loading ? 'Adding...' : 'Add Place' }}
          </button>
          <button type="button" class="btn-cancel" @click="toggleForm">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.add-place-section {
  margin: 20px 0;
}

.btn-add-place {
  padding: 12px 20px;
  background: linear-gradient(135deg, #0066cc, #0052a3);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  width: 100%;
}

.btn-add-place:hover {
  background: linear-gradient(135deg, #0052a3, #003d7a);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
}

.place-form-container {
  background: white;
  border: 2px solid #e8e4dd;
  border-radius: 12px;
  padding: 20px;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.form-header h3 {
  margin: 0;
  font-size: 16px;
  color: #222;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #999;
  transition: color 0.2s;
}

.close-btn:hover {
  color: #666;
}

.error-message {
  background: #ffe8e8;
  color: #cc0000;
  padding: 10px 12px;
  border-radius: 6px;
  margin-bottom: 12px;
  font-size: 13px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 12px;
  font-weight: 600;
  color: #555;
  margin-bottom: 6px;
}

.form-group input,
.form-group textarea,
.form-group select {
  padding: 10px 12px;
  border: 1px solid #e8e4dd;
  border-radius: 6px;
  font-size: 13px;
  font-family: inherit;
  color: #222;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #0066cc;
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.rating-stars {
  display: flex;
  gap: 4px;
  align-items: center;
}

.star-btn {
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 22px;
  opacity: 0.3;
  transition: opacity 0.2s;
}

.star-btn.active {
  opacity: 1;
}

.star-btn:hover {
  opacity: 0.6;
}

.rating-text {
  margin-left: 8px;
  font-size: 12px;
  color: #999;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 8px;
}

.btn-submit,
.btn-cancel {
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  flex: 1;
}

.btn-submit {
  background: linear-gradient(135deg, #1a7a2a, #0d5a1a);
  color: white;
}

.btn-submit:hover:not(:disabled) {
  background: linear-gradient(135deg, #0d5a1a, #003d0a);
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
