<script setup>

import { ref, reactive, computed, onMounted, watch } from 'vue'
import Layout from '../../components/Layout.vue';
import GlobalAlerts from '../../components/GlobalAlerts.vue';
import { RouterView } from 'vue-router';
import { useAuthStore } from '../../stores/authStore';

const authStore = useAuthStore();
const tab = ref(null);

const user = ref(authStore.user);



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


        </template>
        <template v-slot:body>

            <v-card class="w-50 roundedd-lg">

                <v-tabs v-model="tab" bg-color="indigo-accent-1">
                    <v-tab value="datos">Datos de usuario</v-tab>
                    <v-tab value="seguridad">Seguridad </v-tab>
                </v-tabs>
                <v-card-text>
                    <v-tabs-window v-model="tab">
                        <v-tabs-window-item value="datos">
                            <div class="ancho d-flex align-center justify-space-evenly centrar">
                                <v-label class="ancho-label">Nombre : </v-label>
                                <v-text-field class="ancho-input" bg-color="indigo-accent-2" disabled v-model="user.name"></v-text-field>
                            </div> 
                            <div class="ancho d-flex align-center justify-space-evenly centrar">
                                <v-label class="ancho-label">Correo : </v-label>
                                <v-text-field class="ancho-input " bg-color="indigo-accent-2" disabled v-model="user.email"></v-text-field>
                            </div> 

                        </v-tabs-window-item>
                        <v-tabs-window-item value="seguridad">
                            Seguridad
                        </v-tabs-window-item>
                    </v-tabs-window>
                </v-card-text>


            </v-card>


        </template>
    </Layout>


</template>



<style scoped>
.ancho{
    width: 400px;
}
.centrar{
    margin : 0 auto;
}
.ancho-input{
    width: 200px;
}
.ancho-label{
    width: 100px;
}
</style>