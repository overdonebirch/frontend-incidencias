<script setup>

import { ref, reactive, computed, onMounted, watch } from 'vue'
import Layout from '../components/Layout.vue';
import Incidencia from '../components/Incidencia.vue';
import Formulario from '../components/Formulario.vue';
import { useIncidenciasStore } from '../stores/incidenciasStore.js';
import GlobalAlerts from '../components/GlobalAlerts.vue';
import { RouterView } from 'vue-router';
const incidenciasStore = useIncidenciasStore();

const mostrarIncidencias = ref(false)
const urgenciaSeleccionada = ref(null);
const tiempoSeleccionado = ref(null);
const paginacionSeleccionada = ref(null);

watch(tiempoSeleccionado, () => { incidenciasStore.filtrarPorFechas(tiempoSeleccionado.value) })
watch(urgenciaSeleccionada, () => { incidenciasStore.filtrarPorUrgencia(urgenciaSeleccionada.value); })
watch(paginacionSeleccionada, () => { incidenciasStore.cambiarPaginacion(paginacionSeleccionada.value); })
onMounted(async () => {
    await incidenciasStore.obtenerIncidencias();
    await incidenciasStore.obtenerSchema();
})


</script>

<template>

    <GlobalAlerts />


    <Layout>

        <template v-slot:title>
            <v-card color="indigo-accent-2" width="400" class="text-center pa-1 rounded-xl ">
                <v-card-text class="text-h4 white--text">
                    <h1 class="text-h4 font-weight-thin">Listado De Incidencias</h1>
                </v-card-text>
            </v-card>
            <!-- Spinner de carga -->
            <div class="text-center pt-16 min-h-screen " v-if="!incidenciasStore.cargarIncidencias">
                <v-progress-circular color="primary" indeterminate></v-progress-circular>
            </div>
        </template>

        <template v-slot:body v-if="incidenciasStore.cargarIncidencias">
            <div v-if="incidenciasStore.listaIncidencias.length <= 0"
                class="text-center text-h5 amber text-blue-grey-lighten-3">--No hay datos--
            </div>
            <v-row v-else>
                <v-col lg="4 " md="12">
                    <v-select class="w-75 mx-auto rounded-lg" label="Filtrar por urgencia" variant="underlined"
                        v-model="urgenciaSeleccionada" :items="incidenciasStore.urgenciasDisponibles"></v-select>
                </v-col>
                <v-col lg="4 " md="12">
                    <v-select class="w-75 mx-auto " label="Filtrar por fecha" v-model="tiempoSeleccionado"
                        :items="['Mas Recientes', 'Mas Antiguas']" variant="underlined"></v-select>
                </v-col>
                <v-col lg="4" md="12">

                    <v-select class="w-75 mx-auto " label="Paginar" v-model="paginacionSeleccionada"
                    :items="[5,10,15]" variant="outlined"></v-select>

                </v-col>
            </v-row>
            <!-- Listado de incidencias -->
            <v-col cols="12">

                <Incidencia v-for="incidencia in incidenciasStore.listaIncidencias" :incidencia="incidencia" />
            </v-col>


        </template>
        <template v-slot:footer>
            <v-pagination :total-visible="incidenciasStore.totalPaginas" :length="incidenciasStore.totalPaginas"
                @update:modelValue="incidenciasStore.seleccionarPagina($event)"></v-pagination>
        </template>
    </Layout>


</template>



<style>
.min-h-screen {
    min-height: 990px;
}
</style>