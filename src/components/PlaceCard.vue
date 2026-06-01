<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Place } from '@/types'

const props = defineProps<{ place: Place }>()
const emit = defineEmits(['update:place', 'delete'])

const isEditing = ref(false)
const editedPlace = ref<Place>({ ...props.place })

function startEdit() { isEditing.value = true; editedPlace.value = { ...props.place } }
function cancelEdit() { isEditing.value = false; editedPlace.value = { ...props.place } }
function saveEdit() { emit('update:place', editedPlace.value); isEditing.value = false }
function setRating(stars: number) { editedPlace.value.rating = stars }
function deletePlace() { emit('delete', props.place.placeId) }

const statusLabel = computed(() => props.place.status === 'visited' ? '✓ Visited' : '○ Planned')
</script>

<template>
  <div class="card place-card">
    <!-- View Mode -->
    <div v-if="!isEditing">
      <div class="place-header">
        <h3 class="place-name">{{ place.name }}</h3>
        <span class="pill" :class="place.status === 'visited' ? 'status-visited' : 'status-planned'">
          {{ statusLabel }}
        </span>
      </div>
      <div class="place-meta">
        <span v-if="place.category">📍 {{ place.category }}</span>
        <span v-if="place.rating">⭐ {{ place.rating }}/5</span>
      </div>
      <p v-if="place.address" class="detail">🗺 {{ place.address }}</p>
      <p v-if="place.notes" class="notes">{{ place.notes }}</p>
      <p v-if="place.visitDate" class="detail">
        📅 {{ new Date(place.visitDate).toLocaleDateString('de-DE') }}
      </p>
      <div class="place-actions">
        <button class="btn-edit" @click="startEdit">Edit</button>
        <button class="btn-delete" @click="deletePlace">Delete</button>
      </div>
    </div>

    <!-- Edit Mode -->
    <div v-else class="form">
      <div class="field">
        <label>Name</label>
        <input v-model="editedPlace.name" type="text" />
      </div>
      <div class="row">
        <div class="field">
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
        <div class="field">
          <label>Status</label>
          <select v-model="editedPlace.status">
            <option value="planned">Planned</option>
            <option value="visited">Visited</option>
          </select>
        </div>
      </div>
      <div class="field">
        <label>Address</label>
        <input v-model="editedPlace.address" type="text" placeholder="e.g. Champ de Mars, Paris" />
      </div>
      <div class="field">
        <label>Rating</label>
        <div class="stars">
          <button v-for="star in 5" :key="star" class="star"
                  :class="{ active: editedPlace.rating && editedPlace.rating >= star }"
                  @click="setRating(star)">⭐</button>
          <span v-if="editedPlace.rating" class="rating-text">{{ editedPlace.rating }}/5</span>
        </div>
      </div>
      <div class="field">
        <label>Visit Date</label>
        <input v-model="editedPlace.visitDate" type="datetime-local" />
      </div>
      <div class="field">
        <label>Notes</label>
        <textarea v-model="editedPlace.notes" rows="3"></textarea>
      </div>
      <div class="place-actions">
        <button class="btn-save" @click="saveEdit">Save</button>
        <button class="btn-secondary" @click="cancelEdit">Cancel</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.place-card { margin-bottom: 12px; transition: box-shadow 0.2s; }
.place-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.07); }
.place-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px; }
.place-name { margin: 0; font-size: 16px; }
.status-visited { background: var(--green); }
.status-planned { background: var(--lavender); }
.place-meta { display: flex; gap: 14px; font-size: 13px; color: var(--muted); margin-bottom: 8px; }
.detail { font-size: 13px; color: var(--muted); margin: 4px 0; }
.notes { font-size: 13px; color: var(--muted); margin: 8px 0; }
.place-actions { display: flex; gap: 8px; margin-top: 12px; }
.btn-edit { padding: 6px 14px; background: var(--blue); color: var(--text); border: none; border-radius: 6px; font-size: 13px; font-weight: 500; cursor: pointer; }
.btn-delete { padding: 6px 14px; background: #ffe8e8; color: #cc0000; border: none; border-radius: 6px; font-size: 13px; font-weight: 500; cursor: pointer; }
.btn-save { padding: 6px 14px; background: var(--green); color: var(--text); border: none; border-radius: 6px; font-size: 13px; font-weight: 500; cursor: pointer; }
.btn-secondary { padding: 6px 14px; background: var(--surface); color: var(--muted); border: 1px solid var(--border); border-radius: 6px; font-size: 13px; cursor: pointer; }
.form { display: flex; flex-direction: column; gap: 12px; }
.row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.field { display: flex; flex-direction: column; gap: 5px; }
.field label { font-size: 12px; font-weight: 600; color: var(--muted); }
.field input, .field select, .field textarea {
  padding: 9px 11px; border: 1px solid var(--border); border-radius: 7px;
  font-size: 13px; font-family: var(--font-sans); background: var(--surface); color: var(--text);
}
.field input:focus, .field select:focus, .field textarea:focus {
  outline: none; border-color: var(--pink); box-shadow: 0 0 0 3px rgba(247,182,200,0.2);
}
.stars { display: flex; align-items: center; gap: 2px; }
.star { background: none; border: none; cursor: pointer; font-size: 19px; opacity: 0.25; padding: 0; transition: opacity 0.15s; }
.star.active { opacity: 1; }
.rating-text { margin-left: 6px; font-size: 12px; color: var(--muted); }
</style>
