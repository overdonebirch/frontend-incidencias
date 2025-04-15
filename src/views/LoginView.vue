<script setup>

import { ref, reactive, computed, onMounted, watch } from 'vue'
import Layout from '../components/Layout.vue';
import { useIncidenciasStore } from '../stores/incidenciasStore.js';
import GlobalAlerts from '../components/GlobalAlerts.vue';

const incidenciasStore = useIncidenciasStore();




</script>

<template>

    <GlobalAlerts />


    <Layout>

        <template v-slot:title>
            <v-card color="indigo-accent-2" width="400" class="text-center pa-1 rounded-xl ">
                <v-card-text class="text-h4 white--text">
                    <h1 class="text-h4 font-weight-thin">Login</h1>
                </v-card-text>
            </v-card>
            <!-- Spinner de carga -->
            <div class="text-center pt-16 min-h-screen " v-if="!incidenciasStore.cargarIncidencias">
                <v-progress-circular color="primary" indeterminate></v-progress-circular>
            </div>
        </template>

        <template v-slot:body v-if="incidenciasStore.cargarIncidencias">
           

        </template>

    </Layout>


</template>



<style>
.min-h-screen {
    min-height: 990px;
}
</style>