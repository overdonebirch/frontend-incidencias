<script setup>

import { ref, reactive, computed, onMounted, watch } from 'vue'
import Layout from '../../components/Layout.vue';
import GlobalAlerts from '../../components/GlobalAlerts.vue';
import { RouterView } from 'vue-router';





</script>

<template>

    <GlobalAlerts />
    <!-- Spinner de carga -->

    <Layout>

        <template v-slot:title>

            <v-card color="indigo-accent-2" width="400" class="text-center pa-1 rounded-xl">
                <v-card-text class="text-h4 white--text ">
                    <h1 class="text-h4 font-weight-thin">Perfil</h1>
                </v-card-text>
            </v-card>

            <!-- <div class="text-center pt-16" >
                <v-progress-circular color="primary" indeterminate></v-progress-circular>
            </div> -->
        </template>
        <template v-slot:body>
           
        </template>
    </Layout>


</template>



<style lang="scss" scoped></style>