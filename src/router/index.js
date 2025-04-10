import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import CrearIncidenciaView from '../views/CrearIncidenciaView.vue'
import ListarIncidenciasView from '../views/ListarIncidenciasView.vue'
import ListarIncidenciasTablaView from '../views/ListarIncidenciasTablaView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path : '/',
        name : 'crear-incidencia',
        component : CrearIncidenciaView
    },
    {
        path : '/listarIncidencias',
        name : 'listar-incidencias',
        component : ListarIncidenciasView
    },
    {
      path : '/listarIncidenciasTabla',
      name : 'listar-incidencias-tabla',
      component : ListarIncidenciasTablaView
    }
  ]
})

export default router
