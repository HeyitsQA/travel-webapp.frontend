<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'

const route = useRoute()
const publicPages = ['/', '/login', '/signup']
const { isAuthenticated, logout } = useAuth0()

</script>

<template>
  <header class="nav"  v-if="!publicPages.includes(route.path)">
    <RouterLink to="/home">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <button class="logout-button" @click="() => logout()">Log Out</button>
  </header>

  <RouterView />
</template>

<style scoped>
.nav {
  display: flex;
  gap: 12px;
  padding: 12px;
}
.logout-button {
  margin-left: auto;
  background: none;
  border: 1.5px solid #e8e4dd;
  border-radius: 10px;
  padding: 6px 14px;
  font-size: 13px;
  cursor: pointer;
  color: #444;
  transition: all 0.2s;
}

.logout-button:hover {
  background: #f5f2ec;
  border-color: #e8a0b0;
  color: #c06070;
}
</style>
