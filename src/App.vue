<script setup>

import { ref, reactive, computed, onMounted } from 'vue'

import Incidencia from './components/Incidencia.vue';
import Formulario from './components/Formulario.vue';
import { useIncidenciasStore } from './stores/incidenciasStore.js';

const incidenciasStore = useIncidenciasStore();
const mostrarIncidencias = ref(false)

onMounted(async () => {
  await incidenciasStore.obtenerIncidencias();
  await incidenciasStore.obtenerSchema();

})

</script>

<template>
  <v-app>
    <v-container class="pt-10" style="max-width: 800px">
      <Formulario></Formulario>
      <v-row>
        <v-col col="12">
          <div v-if="incidenciasStore.listaIncidencias.length <= 0" class="text-center text-h5 amber text-blue-grey-lighten-3" >--No hay datos--</div>
          <v-col v-else cols="12" class="pa-0 mt-16 text-center mb-10">
            <v-btn @click="() => mostrarIncidencias = !mostrarIncidencias">Mostrar Incidencias</v-btn>
          </v-col>
          <Incidencia  v-if="mostrarIncidencias" v-for="incidencia in incidenciasStore.listaIncidencias" :incidencia="incidencia"/>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style></style>