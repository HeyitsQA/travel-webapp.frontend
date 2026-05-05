import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TripOverView from '../views/TripOverView.vue'
import NewTrip from '@/views/NewTrip.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/trips',
      name: 'trips',
      component: () => import('../views/TripOverview.vue'),
    },
    {
      path: '/trips/new',
      name: 'new-trip',
      component: NewTrip,
    }
  ],
})

export default router
