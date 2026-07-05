import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from '@auth0/auth0-vue'
import HomeView from '../views/HomeView.vue'
import LandingView from '@/views/LandingView.vue'
import TripOverview from '../views/TripOverview.vue'
import NewTrip from '@/views/NewTrip.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      beforeEnter: authGuard,
    },
    {
      path: '/trips',
      name: 'trips',
      component: TripOverview,
      beforeEnter: authGuard,
    },
    {
      path: '/trips/new',
      name: 'new-trip',
      component: NewTrip,
      beforeEnter: authGuard,
    },
    {
      path: '/trips/:id',
      name: 'trip-detail',
      component: () => import('@/views/TripDetailView.vue'),
      beforeEnter: authGuard,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutPageView.vue'),
      beforeEnter: authGuard,
    }
  ],
})

export default router
