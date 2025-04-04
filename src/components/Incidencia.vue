<script setup>

import { useIncidenciasStore } from '../stores/incidenciasStore';
import { formatearFecha } from '../helpers/formatearFecha.js';
const incidenciasStore = useIncidenciasStore();

const props = defineProps({
  incidencia: {
    type: Object,
    required: true
  }
})

</script>


<template>
  <v-sheet class="mb-5 d-flex justify-space-evenly pa-5" color="blue-grey-lighten-4 rounded-lg">
    <div style="width: 500px;">
      <div>Titulo : {{ incidencia.titulo }}</div>
      <div>Descripcion : {{ incidencia.descripcion }}</div>
      <div>Urgencia : {{ incidencia.urgencia }}</div>
      <div>Fecha Alta : {{ formatearFecha(incidencia.created_at)}}</div>
      {{ console.log(typeof incidencia.created_at ) }}
    </div>
    <div class="d-flex flex-column ga-2">
      <v-btn @click="incidenciasStore.modoActualizar(incidencia.id)">Actualizar</v-btn>
      <v-btn color="deep-orange-lighten-3" @click="incidenciasStore.eliminarIncidencia(incidencia.id)">Eliminar</v-btn>
    </div>

  </v-sheet>
</template>


<style lang="scss" scoped></style>