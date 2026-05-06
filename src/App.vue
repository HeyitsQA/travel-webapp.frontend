<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import SignUp from './components/SignUp.vue'
</script>

<template>
  <header class="nav">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </header>

  <RouterView />
</template>

<style scoped>
.nav {
  display: flex;
  gap: 12px;
  padding: 12px;
}
</style>
