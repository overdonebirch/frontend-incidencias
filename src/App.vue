<script setup>

import { ref, reactive, computed, onMounted,watch } from 'vue'

import Incidencia from './components/Incidencia.vue';
import Formulario from './components/Formulario.vue';
import { useIncidenciasStore } from './stores/incidenciasStore.js';
import { useAlertasStore } from './stores/alertasStore.js';
const incidenciasStore = useIncidenciasStore();
const alertasStore = useAlertasStore();
const mostrarIncidencias = ref(false)
const urgenciaSeleccionada = ref(null);


watch(urgenciaSeleccionada,() => {  incidenciasStore.filtrarPorUrgencia(urgenciaSeleccionada.value);})
onMounted(async () => {
  await incidenciasStore.obtenerIncidencias();
  await incidenciasStore.obtenerSchema();
})

</script>

<template>
  <v-app>
    <div class="text-center pt-16" v-if="!incidenciasStore.cargarFormulario">
      <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </div>
    <v-container class="pt-10" style="max-width: 800px" v-if="incidenciasStore.cargarFormulario">
      <v-alert v-for="alerta in alertasStore.listaAlertas" :title=alerta.tipo :type=alerta.tipo :text=alerta.mensaje
        class="mb-3" text="asdasdasd">
      </v-alert>
      <Formulario></Formulario>
      <v-row>
        <v-col cols="12">
          <div v-if="incidenciasStore.listaIncidencias.length <= 0"
            class="text-center text-h5 amber text-blue-grey-lighten-3">--No hay datos--</div>

          <v-col v-else cols="12" class="pa-0 mt-16 text-center mb-10">
            <v-btn @click="() => mostrarIncidencias = !mostrarIncidencias">Mostrar Incidencias</v-btn>
          </v-col>
          <v-col col="12" v-if="mostrarIncidencias && incidenciasStore.listaIncidencias.length > 0">
            <v-row>
              <v-col >
                <v-select class="w-75 mx-auto rounded-lg" label="Filtrar por urgencia"   variant="underlined"
                v-model="urgenciaSeleccionada"
                :items="incidenciasStore.urgenciasDisponibles"></v-select>
              </v-col>
              <v-col>
                <v-select class="w-75 mx-auto " label="Filtrar por fecha"   variant="underlined"></v-select>
              </v-col>
            </v-row>

            <v-col cols="12">
              <Incidencia v-for="incidencia in incidenciasStore.listaIncidencias" :incidencia="incidencia" />
            </v-col>
          </v-col>

        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style></style>