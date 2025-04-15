<script setup>

import { ref, reactive, computed, onMounted, watch } from 'vue'
import Layout from '../components/Layout.vue';
import { useIncidenciasStore } from '../stores/incidenciasStore.js';
import GlobalAlerts from '../components/GlobalAlerts.vue';

const incidenciasStore = useIncidenciasStore();
const email = ref(null);
const password = ref(null);



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
        </template>

        <template v-slot:body >
           
            <v-form class="w-50 d-flex flex-column">    
                <v-text-field label="email"  required>

                </v-text-field>
                <v-text-field label="password" required>
                </v-text-field>
                <v-btn  class="align-self-lg-end"type="submit">Loguearse</v-btn>
            </v-form>
        </template>

    </Layout>


</template>



<style>
.min-h-screen {
    min-height: 990px;
}
</style>