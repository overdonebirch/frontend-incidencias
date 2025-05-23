import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import CrearIncidenciaView from '../views/CrearIncidenciaView.vue'
import ListarIncidenciasView from '../views/ListarIncidenciasView.vue'
import LoginView from '../views/LoginView.vue'
import PerfilView from '../views/auth/PerfilView.vue'
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
        path : '/login',
        name : 'login',
        component : LoginView
    },
    {
        path : '/perfil',
        name : 'perfil',
        component : PerfilView
    }
  ]
})

export default router
