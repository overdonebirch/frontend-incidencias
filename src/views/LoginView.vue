<script setup>

import { ref, reactive, computed, onMounted, watch } from 'vue'
import Layout from '../components/Layout.vue';
import { useIncidenciasStore } from '../stores/incidenciasStore.js';
import { useAlertasStore } from '../stores/alertasStore.js';
import GlobalAlerts from '../components/GlobalAlerts.vue';
import { useAuthStore } from '../stores/authStore.js';
import axios from 'axios';


const authStore = useAuthStore();
const alertasStore = useAlertasStore();
const email = ref(null);
const password = ref(null);

const login = async (e) => {
  try {
    const credenciales = {
      email: email.value,
      password: password.value,
      device_name: 'browser'
    };

    const response = await axios.post('http://localhost:8000/api/login', credenciales);
    authStore.token = response.data.token;
    alertasStore.agregarAlerta("success", "Usuario Logado");
    e.target.reset();
  } catch (error) {
    alertasStore.agregarAlerta("error", error.response?.data?.message || error.message);
  }
}


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
           
            <v-form class="w-50 d-flex flex-column" @submit.prevent="login">    
                <v-text-field label="email"  v-model="email" required>

                </v-text-field>
                <v-text-field label="password" v-model="password" required>
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