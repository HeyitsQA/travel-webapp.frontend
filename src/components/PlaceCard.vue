<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Place } from '@/types'

const props = defineProps<{
  place: Place
}>()

const emit = defineEmits(['update:place', 'delete'])

const isEditing = ref(false)
const editedPlace = ref<Place>({ ...props.place })


function startEdit() {
  isEditing.value = true
  editedPlace.value = { ...props.place }
}

function cancelEdit() {
  isEditing.value = false
  editedPlace.value = { ...props.place }
}

function saveEdit() {
  emit('update:place', editedPlace.value)
  isEditing.value = false
}

function setRating(stars: number) {
  editedPlace.value.rating = stars
}

function deletePlace() {
  emit('delete', props.place.placeId)
}

const statusLabel = computed(() => {
  return props.place.status === 'visited' ? '✓ Visited' : '○ Planned'
})
</script>

<template>
  <div class="place-card" :class="{ editing: isEditing }">
    <!-- View Mode -->
    <div v-if="!isEditing" class="place-content">
      <div class="place-header">
        <h3 class="place-name">{{ place.name }}</h3>
        <span class="status-badge" :class="place.status">
          {{ statusLabel }}
        </span>
      </div>

      <div class="place-meta">
        <span v-if="place.category" class="category">📍 {{ place.category }}</span>
        <span v-if="place.rating" class="rating">
          ⭐ {{ place.rating }}/5
        </span>
      </div>

      <p v-if="place.notes" class="notes">{{ place.notes }}</p>

      <div v-if="place.visitDate" class="visit-date">
        📅 {{ new Date(place.visitDate).toLocaleDateString('de-DE') }}
      </div>

      <div class="place-actions">
        <button class="btn-edit" @click="startEdit">Edit</button>
        <button class="btn-delete" @click="deletePlace">Delete</button>
      </div>
    </div>

    <!-- Edit Mode -->
    <div v-else class="place-edit">
      <div class="form-group">
        <label>Name</label>
        <input v-model="editedPlace.name" type="text" placeholder="Place name" />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Category</label>
          <select v-model="editedPlace.category">
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
          <select v-model="editedPlace.status">
            <option value="planned">Planned</option>
            <option value="visited">Visited</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label>Rating (1-5)</label>
        <div class="rating-input">
          <button
            v-for="star in 5"
            :key="star"
            class="star"
            :class="{ active: editedPlace.rating && editedPlace.rating >= star }"
            @click="setRating(star)"
          >
            ⭐
          </button>
          <span v-if="editedPlace.rating" class="rating-value">{{ editedPlace.rating }}/5</span>
        </div>
      </div>

      <div class="form-group">
        <label>Visit Date</label>
        <input v-model="editedPlace.visitDate" type="datetime-local" />
      </div>

      <div class="form-group">
        <label>Notes</label>
        <textarea
          v-model="editedPlace.notes"
          placeholder="Your thoughts about this place..."
          rows="3"
        ></textarea>
      </div>

      <div class="form-group">
        <label>Latitude</label>
        <input v-model.number="editedPlace.latitude" type="number" placeholder="0.0000" step="0.0001" />
      </div>

      <div class="form-group">
        <label>Longitude</label>
        <input v-model.number="editedPlace.longitude" type="number" placeholder="0.0000" step="0.0001" />
      </div>

      <div class="edit-actions">
        <button class="btn-save" @click="saveEdit">Save</button>
        <button class="btn-cancel" @click="cancelEdit">Cancel</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.place-card {
  background: white;
  border: 1px solid #e8e4dd;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  transition: all 0.2s ease;
}

.place-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-color: #d4cec5;
}

.place-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 12px;
}

.place-name {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #222;
}

.status-badge {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
}

.status-badge.visited {
  background: #d4f4dd;
  color: #1a7a2a;
}

.status-badge.planned {
  background: #ffecd1;
  color: #8b5a00;
}

.place-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
  font-size: 13px;
}

.category,
.rating {
  color: #666;
}

.notes {
  margin: 12px 0;
  color: #555;
  font-size: 13px;
  line-height: 1.5;
}

.visit-date {
  font-size: 12px;
  color: #999;
  margin: 8px 0;
}

.place-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.btn-edit,
.btn-delete,
.btn-save,
.btn-cancel {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-edit {
  background: #e8f2ff;
  color: #0066cc;
}

.btn-edit:hover {
  background: #cce0ff;
}

.btn-delete {
  background: #ffe8e8;
  color: #cc0000;
}

.btn-delete:hover {
  background: #ffcccc;
}

.btn-save {
  background: #d4f4dd;
  color: #1a7a2a;
}

.btn-save:hover {
  background: #a8e6b5;
}

.btn-cancel {
  background: #f0f0f0;
  color: #666;
}

.btn-cancel:hover {
  background: #e0e0e0;
}

/* Edit Mode */
.place-edit {
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
  margin-bottom: 4px;
}

.form-group input,
.form-group textarea,
.form-group select {
  padding: 8px 10px;
  border: 1px solid #e8e4dd;
  border-radius: 6px;
  font-size: 13px;
  font-family: inherit;
  color: #222;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #0066cc;
  box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.1);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.rating-input {
  display: flex;
  gap: 4px;
  align-items: center;
}

.star {
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  opacity: 0.3;
  transition: opacity 0.2s;
}

.star.active {
  opacity: 1;
}

.star:hover {
  opacity: 0.6;
}

.rating-value {
  margin-left: 8px;
  font-size: 13px;
  color: #999;
}

.edit-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}
</style>
