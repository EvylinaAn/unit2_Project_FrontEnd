import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DestinationListView from '../views/DestinationListView.vue'
import ChecklistView from '../views/ChecklistView.vue'
import SingleDestinationView from '@/views/SingleDestinationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/destination',
      name: 'destination',
      component: DestinationListView
    },
    {
      path: '/destination/:id',
      name: 'singledestination',
      component: SingleDestinationView
    },
    {
      path: '/destination/:id/checklist',
      name: 'checklist',
      component: ChecklistView
    },
  ]
})

export default router
