import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TripOverview from '../views/TripOverview.vue'
import NewTrip from '@/views/NewTrip.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/trips',
      name: 'trips',
      component: TripOverview,
      meta: { requiresAuth: true },
    },
    {
      path: '/trips/new',
      name: 'new-trip',
      component: NewTrip,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
    },
    {
      path: '/trips/:id',
      name: 'trip-detail',
      component: () => import('@/views/TripDetailView.vue'),
      meta: { requiresAuth: true },
    }
  ],
})

// Schützt Routen mit meta.requiresAuth: ohne Login -> weiter zu /login
router.beforeEach((to) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'

  if (to.meta.requiresAuth && !isLoggedIn) {
    return { name: 'login' }
  }

  // Bereits eingeloggt? Login/Signup-Seiten überspringen
  if ((to.name === 'login' || to.name === 'signup') && isLoggedIn) {
    return { name: 'home' }
  }
})

export default router
