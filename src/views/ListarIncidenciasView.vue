<script setup>

import { ref, reactive, computed, onMounted, watch } from 'vue'
import Layout from '../components/Layout.vue';
import { useIncidenciasStore } from '../stores/incidenciasStore.js';
import GlobalAlerts from '../components/GlobalAlerts.vue';
import IncidenciaTd from '../components/IncidenciaTd.vue';
import DetalleIncidencia from '../components/DetalleIncidencia.vue';
const incidenciasStore = useIncidenciasStore();

const urgenciaSeleccionada = ref(null);
const estadoSeleccionado = ref(null);
const tiempoSeleccionado = ref(null);
const paginacionSeleccionada = ref(null);
const mostrarFiltros = ref(['filtros']);

watch(tiempoSeleccionado, () => { incidenciasStore.filtrarPorFechas(tiempoSeleccionado.value) })
watch(estadoSeleccionado, () => { incidenciasStore.filtrarPorEstado(estadoSeleccionado.value) })
watch(urgenciaSeleccionada, () => { incidenciasStore.filtrarPorUrgencia(urgenciaSeleccionada.value); })
watch(paginacionSeleccionada, () => { incidenciasStore.cambiarPaginacion(paginacionSeleccionada.value); })
onMounted(async () => {
    await incidenciasStore.obtenerIncidencias();
    await incidenciasStore.obtenerSchema();
})

const drawer = ref(false);
const altura = computed(() => drawer.value ? 'h-screen' : '');

const detallesIncidencia = (id) => {
    drawer.value = !drawer.value
    incidenciasStore.incidenciaActualizar = incidenciasStore.listaIncidencias.find(value => value.id === id);
}
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

            <DetalleIncidencia v-model:drawer="drawer"></DetalleIncidencia>
            <div v-if="incidenciasStore.listaIncidencias.length <= 0"
                class="text-center text-h5 amber text-blue-grey-lighten-1">--No hay datos--
            </div>


            <!-- Listado de incidencias -->
            <v-col cols="12">
                <v-table>
                    <!-- parte superior de la tabla -->
                    <template v-slot:top>
                        <v-row>
                            <!-- Ocultar o mostrar filtros -->
                            <v-expansion-panels v-model="mostrarFiltros" class="mb-10 ">
                                <v-expansion-panel value="filtros">
                                    <template v-slot:title>
                                        Filros
                                    </template>
                                    <template v-slot:text>
                                        <div class="d-flex flex-sm-wrap">
                                            <v-col lg="4" md="12">

                                                <v-select class="w-75 mx-auto " label="Paginar"
                                                    v-model="paginacionSeleccionada" :items="[5, 10, 15]"
                                                    variant="outlined"></v-select>

                                            </v-col>
                                            <v-col lg="4 " md="12">
                                                <v-select class="w-75 mx-auto " label="Filtrar por fecha"
                                                    v-model="tiempoSeleccionado"
                                                    :items="['Mas Recientes', 'Mas Antiguas']"
                                                    variant="underlined"></v-select>
                                            </v-col>
                                            <v-col lg="4 " md="12">
                                                <v-select class="w-75 mx-auto rounded-lg" label="Filtrar por urgencia"
                                                    variant="underlined" v-model="urgenciaSeleccionada"
                                                    :items="incidenciasStore.urgenciasDisponibles"></v-select>
                                            </v-col>
                                            <v-col lg="4 " md="12">
                                                <v-select class="w-75 mx-auto rounded-lg" label="Filtrar por estado"
                                                    variant="underlined" v-model="estadoSeleccionado"
                                                    :items="['En Proceso', 'Abierta', 'Cerrada', 'Resuelta']"></v-select>
                                            </v-col>
                                        </div>
                                    </template>
                                </v-expansion-panel>
                            </v-expansion-panels>
                            <!-- Fin Filtros -->
                        </v-row>
                    </template>
                    <!-- FIN de la parte superior -->
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Descripción</th>
                            <th>Urgencia</th>
                            <th>Estado</th>
                            <th>Fecha Alta</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <v-hover v-for="incidencia in incidenciasStore.listaIncidencias" :key="incidencia.id">
                            <template v-slot:default="{ isHovering, props }">
                                <tr @click="detallesIncidencia(incidencia.id)" v-bind="props"
                                    :class="{ 'bg-indigo-lighten-2': isHovering }" style="cursor: pointer;">
                                    <IncidenciaTd :incidencia="incidencia" />
                                </tr>
                            </template>
                        </v-hover>
                    </tbody>
                </v-table>
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

.centrar {
    margin: 0 auto;
}

.bg-red {
    background-color: rgba(255, 0, 0, 0.2) !important;
    /* Rojo con transparencia */
}

/* Si prefieres definir todo en una clase */
.row-hover:hover {
    background-color: rgba(255, 0, 0, 0.2) !important;
    cursor: pointer;
}

.ancho-label {
    width: 300px;
}
</style>