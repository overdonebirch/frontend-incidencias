<script setup>
import Layout from '../components/Layout.vue';
import { useIncidenciasStore } from '../stores/incidenciasStore.js';
import { ref, reactive, onMounted } from 'vue';
import { formatearFecha } from '../helpers/formatearFecha.js';



onMounted(async () => {
    await incidenciasStore.obtenerIncidencias();

})

const incidenciasStore = useIncidenciasStore();
const itemsPerPage = ref(5);

const headers = ref([
    { title: 'Titulo', key: 'titulo' },
    { title: 'Descripcion', key: 'descripcion' },
    { title: 'Urgencia', key: 'urgencia' },
    { title: 'Fecha Creación', key: 'created_at', format: value => formatearFecha(value) }


])


</script>


<template>
    <Layout>

        <template v-slot:title>

        </template>

        <template v-slot:body>
            <v-row class="w-100">
                <!-- Listado de incidencias -->
                <v-col cols="12">
                    <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers"
                        :loading="!incidenciasStore.cargarIncidencias"
                        :items="incidenciasStore.listaIncidencias" 
                        :items-length="incidenciasStore.totalDeIncidencias"
                        @update:options="(value) => incidenciasStore.cambiarPaginacion(value.itemsPerPage)">
                        <template v-slot:item.created_at="{ item }">
                            {{ formatearFecha(item.created_at) }}
                        </template>
                    </v-data-table-server>
                </v-col>
            </v-row>
        </template>
        <template v-slot:footer>

        </template>
    </Layout>
</template>


<style lang="scss" scoped></style>