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

watch(tiempoSeleccionado, () => { incidenciasStore.filtrarPorFechas(tiempoSeleccionado.value) })
watch(urgenciaSeleccionada, () => { incidenciasStore.filtrarPorUrgencia(urgenciaSeleccionada.value); })
onMounted(async () => {
    await incidenciasStore.obtenerIncidencias();
    await incidenciasStore.obtenerSchema();
})


</script>

<template>

    <GlobalAlerts />
    <!-- Spinner de carga -->
    <div class="text-center pt-16" v-if="!incidenciasStore.cargarFormulario">
        <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </div>
    <Layout>

        <template v-slot:title v-if="incidenciasStore.cargarFormulario">

            <v-card color="teal-lighten-4" width="400" class="text-center pa-1 rounded-xl mt-10">
                <v-card-text class="text-h4 white--text">
                    <h1 class="text-h4 font-weight-thin">Crea Una Incidencia</h1>
                </v-card-text>
              </v-card>

        </template>
        <template v-slot:body v-if="incidenciasStore.cargarFormulario">
            <Formulario :modo="'Creacion'"></Formulario>
        </template>
    </Layout>


</template>



<style lang="scss" scoped></style>