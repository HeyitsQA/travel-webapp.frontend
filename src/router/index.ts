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
    },
    {
      path: '/trips',
      name: 'trips',
      component: TripOverview,
    },
    {
      path: '/trips/new',
      name: 'new-trip',
      component: NewTrip,
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
      component: () => import('@/views/TripDetailView.vue')
    }
  ],
})

export default router
