import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import CrearIncidenciaView from '../views/CrearIncidenciaView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/app',
      name: 'home',
      component: App,
    },
    {
        path : '/crearIncidencia',
        name : 'crear-incidencia',
        component : CrearIncidenciaView
    }
  ]
})

export default router
