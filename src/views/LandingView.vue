<script setup lang="ts">
import { watch } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { isAuthenticated, loginWithRedirect } = useAuth0()

watch(
  isAuthenticated,
  (loggedIn) => {
    if (loggedIn) router.replace('/home')
  },
  { immediate: true }
)

function login() {
  loginWithRedirect()
}

function signup() {
  loginWithRedirect({ authorizationParams: { screen_hint: 'signup' } })
}
</script>

<template>
  <div class="landing">
    <header class="landing-nav">
      <div class="brand">
        <span class="brand-name">Travel Journal</span>
      </div>
      <button class="btn-login" @click="login">Log in</button>
    </header>

    <main class="hero-wrapper">
      <section class="hero">
        <img src="@/assets/logo.png" alt="Travel Journal" class="hero-logo" />
        <h1 class="hero-title">Welcome to Travel Journal App</h1>
        <p class="hero-subtitle">
          Plan your next trips or write down your memorable trips.
        </p>
        <div class="hero-actions">
          <button class="btn-primary" @click="signup">Get started</button>
          <button class="btn-secondary" @click="login">I already have an account</button>
        </div>
      </section>

      <section class="features">
        <h2 class="features-title">All you can do</h2>
        <ul class="feature-list">
          <li>
            <span class="icon">✈️</span>
            <div>
              <strong>Create a trip</strong>
              <p>Give it a name, destination, dates, status, and a short description.</p>
            </div>
          </li>
          <li>
            <span class="icon">📍</span>
            <div>
              <strong>Add places</strong>
              <p>Save landmarks, cafés, restaurants, and activities with notes, ratings, addresses, and visit dates.</p>
            </div>
          </li>
          <li>
            <span class="icon">📝</span>
            <div>
              <strong>Edit anytime</strong>
              <p>Update the trip description or a place's details as your plans change.</p>
            </div>
          </li>
          <li>
            <span class="icon">🔍</span>
            <div>
              <strong>Search &amp; filter</strong>
              <p>Search by name or destination, filter by status, year, category, or rating.</p>
            </div>
          </li>
          <li>
            <span class="icon">📊</span>
            <div>
              <strong>See your stats</strong>
              <p>Each trip shows total places, visited vs. planned, and your average rating.</p>
            </div>
          </li>
          <li>
            <span class="icon">🗑️</span>
            <div>
              <strong>Clean up</strong>
              <p>Delete trips or individual places whenever you want.</p>
            </div>
          </li>
        </ul>
      </section>

      <section class="cta-footer">
        <p>Ready to start your journal?</p>
        <button class="btn-primary" @click="signup">Get started for free</button>
      </section>
    </main>
  </div>
</template>

<style scoped>
.landing {
  min-height: 100vh;
  background: var(--bg);
  display: flex;
  flex-direction: column;
}

.landing-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  border-bottom: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(6px);
  position: sticky;
  top: 0;
  z-index: 10;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-name {
  font-size: 15px;
  font-weight: 600;
  color: var(--text);
  letter-spacing: 0.01em;
}

.btn-login {
  padding: 8px 18px;
  background: var(--pink);
  color: var(--text);
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.15s, filter 0.15s;
}

.btn-login:hover {
  transform: translateY(-1px);
  filter: brightness(0.95);
}

.hero-wrapper {
  flex: 1;
  max-width: 860px;
  width: 100%;
  margin: 0 auto;
  padding: 48px 24px 80px;
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.hero {
  text-align: center;
  padding: 24px 0 16px;
}

.hero-logo {
  display: block;
  width: 120px;
  height: 120px;
  object-fit: contain;
  margin: 0 auto 20px;
}

.hero-title {
  font-size: 40px;
  font-weight: 700;
  margin: 0 0 14px;
  color: var(--text);
  line-height: 1.15;
}

.hero-subtitle {
  font-size: 17px;
  color: var(--muted);
  margin: 0 auto 28px;
  max-width: 520px;
  line-height: 1.5;
}

.hero-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary {
  padding: 12px 24px;
  background: var(--pink);
  color: var(--text);
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.15s, filter 0.15s;
}

.btn-primary:hover {
  transform: translateY(-1px);
  filter: brightness(0.95);
}

.btn-secondary {
  padding: 12px 24px;
  background: var(--surface);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.15s, transform 0.15s;
}

.btn-secondary:hover {
  border-color: var(--pink);
  transform: translateY(-1px);
}

.features {
  background: white;
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 28px;
}

.features-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 20px;
  color: var(--text);
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border);
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 14px;
}

.feature-list li {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 14px 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  transition: border-color 0.2s, transform 0.2s;
}

.feature-list li:hover {
  border-color: var(--pink);
  transform: translateY(-1px);
}

.icon {
  font-size: 22px;
  line-height: 1;
  flex-shrink: 0;
}

.feature-list strong {
  display: block;
  font-size: 14px;
  color: var(--text);
  margin-bottom: 2px;
}

.feature-list p {
  margin: 0;
  font-size: 13px;
  color: var(--muted);
  line-height: 1.5;
}

.cta-footer {
  text-align: center;
  padding: 24px 20px;
  background: var(--surface);
  border-radius: 16px;
  border: 1px solid var(--border);
}

.cta-footer p {
  margin: 0 0 14px;
  font-size: 15px;
  color: var(--text);
}

@media (max-width: 600px) {
  .landing-nav {
    padding: 12px 16px;
  }
  .hero-title {
    font-size: 30px;
  }
  .hero-subtitle {
    font-size: 15px;
  }
  .features {
    padding: 20px;
  }
}
</style>
