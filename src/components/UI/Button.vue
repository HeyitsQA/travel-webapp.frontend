<template>
  <button
    :class="[
      'btn',
      variantClass,
      fullWidth ? 'btn-full' : ''
    ]"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  variant: {
    type: String,
    default: 'primary'
  },
  fullWidth: {
    type: Boolean,
    default: false
  }
})

const variantClass = computed(() => {
  return {
    primary: 'btn-primary',
    secondary: 'btn-secondary'
  }[props.variant]
})

function goToTrips() {
  router.push('/trips')
}
</script>

<style scoped>
.btn {
  padding: 12px 18px;
  border-radius: 14px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  border: 1px solid var(--border);
  font-family: var(--font-sans);
}

.btn-full {
  width: 100%;
}

.btn-primary {
  background: var(--pink);
  color: var(--text);
  border: 1px solid transparent;
}

.btn-primary:hover {
  filter: brightness(0.95);
  transform: translateY(-1px);
}


.btn-secondary {
  background: var(--surface);
  color: var(--text);
  border: 1px solid var(--border);
}

.btn-secondary:hover {
  background: rgba(247, 182, 200, 0.12);
  transform: translateY(-1px);
}

</style>
