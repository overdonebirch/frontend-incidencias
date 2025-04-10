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
const page = ref(1);

const headers = ref([
    { title: 'Titulo', key: 'titulo' },
    { title: 'Descripcion', key: 'descripcion' },
    {
        title: 'Urgencia', key: 'urgencia',

    },
    {
        title: 'Fecha Creación', key: 'created_at', format: value => formatearFecha(value)

    }


])

const handleUpdate = (options) => {


    let sortOrder = null;
    let sortKey = null;

    if (options.sortBy && options.sortBy.length > 0) {
        // Acceder al primer elemento del array y a sus propiedades
        sortOrder = options.sortBy[0].order;
        sortKey = options.sortBy[0].key;
    }

    incidenciasStore.filtrosEnTabla({
        page: options.page,
        itemsPerPage: options.itemsPerPage,
        sortOrder: sortOrder,
        sortKey : sortKey
    });
}

</script>


<template>
    <Layout>

        <template v-slot:title>

        </template>


        <template v-slot:body>
            <v-row class="w-100">
                <!-- Listado de incidencias -->
                <v-col cols="12">
                    <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" v-model:page="page"
                        :loading="!incidenciasStore.cargarIncidencias" :items="incidenciasStore.listaIncidencias"
                        :items-length="incidenciasStore.totalDeIncidencias" @update:options="handleUpdate">
                
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