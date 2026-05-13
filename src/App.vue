<script setup lang="ts">
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const authPages = ['/login', '/signup']

function handleLogout() {
  // TODO: clear auth token/session later
  router.push('/login')
}
</script>

<template>
  <header class="nav"  v-if="!authPages.includes(route.path)">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <button class="logout-button" @click="handleLogout">Log Out</button>
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
