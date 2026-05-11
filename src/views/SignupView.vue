<script>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')

function handleSignUp() {
  // TODO: connect to backend
  console.log('Sign up:', name.value, email.value)
}
</script>

<template>
  <div class="page">
    <div class="card">
      <img src="@/assets/logo.png" alt="Travel Journal Logo" class="logo" />

      <h1 class="title">Create Account</h1>
      <p class="subtitle">Start logging your adventures</p>

      <div class="form">
        <div class="field">
          <label>Name</label>
          <input v-model="name" type="text" placeholder="Your name" />
        </div>

        <div class="field">
          <label>Email</label>
          <input v-model="email" type="email" placeholder="you@example.com" />
        </div>

        <div class="field">
          <label>Password</label>
          <input v-model="password" type="password" placeholder="••••••••" />
        </div>

        <button class="btn-primary" @click="handleSignUp">Sign Up</button>

        <p class="switch">
          Already have an account?
          <RouterLink to="/login">Sign in</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(bg);
  padding: 2rem;

}

.card {
  background: #ffffff;
  border-radius: 24px;
  padding: 48px 40px;
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.logo {
  width: 64px;
  height: 64px;
  object-fit: contain;
  margin-bottom: 8px;
}

.title {
  font-size: 26px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}

.subtitle {
  font-size: 14px;
  color: #888;
  margin: 0 0 16px;
}

.form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field label {
  font-size: 13px;
  font-weight: 600;
  color: #444;
}

.field input {
  padding: 12px 16px;
  border-radius: 14px;
  border: 1.5px solid #e8e4dd;
  background: #fafaf8;
  font-size: 14px;
  color: #1a1a1a;
  outline: none;
  transition: border-color 0.2s;
}

.field input:focus {
  border-color: #e8a0b0;
}

.btn-primary {
  margin-top: 4px;
  padding: 14px;
  border-radius: 14px;
  border: none;
  background: #e8a0b0;
  color: #5a2030;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-primary:hover {
  opacity: 0.85;
}

.switch {
  text-align: center;
  font-size: 13px;
  color: #888;
  margin: 0;
}

.switch a {
  color: #c06070;
  font-weight: 600;
  text-decoration: none;
}

.switch a:hover {
  text-decoration: underline;
}
</style>
