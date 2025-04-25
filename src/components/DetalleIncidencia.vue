<script setup>

import { computed } from 'vue';
import { useIncidenciasStore } from '../stores/incidenciasStore';
// const props = defineProps({
//     drawer : {
//         type : Boolean,
//         required : true
//     }
// })

const drawer = defineModel('drawer');

const altura = computed(() => drawer.value ? 'h-screen' : 'd-none');
const incidenciasStore = useIncidenciasStore();

</script>


<template>
    <v-navigation-drawer style="background-color: rgba(65, 81, 181, 0.7);" class="pt-16 d-flex flex-column"
    v-model="drawer" :location="'bottom'" 
    :class="altura"
    >
        <!-- Otros elementos aquí si los hay -->

        <div class="d-flex justify-end opacity-100">
            <v-btn class="ma-2 " @click="() => drawer = !drawer" color="deep-purple-lighten-1">
                <v-icon icon="mdi-arrow-left" start></v-icon>
                Back
            </v-btn>
        </div>

        <v-card style="background-color: rgba(186, 195, 247, 1);" class="w-75 centrar" elevation="0">


            <v-card-title class="text-h4 text-white font-weight-bold">Datos Incidencia</v-card-title>
            <v-card-text class="text-white text-h3 w-100 align-stretch ">
                <div class="d-flex align-center justify-space-evenly centrar">
                    <v-label class="ancho-label text-black text-h4">Titulo : </v-label>
                    <v-text-field class="" bg-color="indigo-accent-2" disabled
                        v-model="incidenciasStore.incidenciaActualizar.titulo"></v-text-field>
                </div>
                <div class="d-flex align-center justify-space-evenly centrar mb-4">
                    <v-label class="ancho-label text-black text-h4">Descripcion : </v-label>
                    <v-text-field class="" bg-color="indigo-accent-2" disabled
                        v-model="incidenciasStore.incidenciaActualizar.descripcion"></v-text-field>
                </div>
                <div class="  d-flex align-center justify-space-evenly centrar mb-8">
                    <v-label class="ancho-label text-black text-h4 mr-auto">Urgencia : </v-label>
                    <div class="d-flex flex-1-1 justify-center ga-5">
                        <v-label class="text-black text-h4 text-bold">{{ incidenciasStore.incidenciaActualizar.urgencia
                            }}</v-label>
                        <v-btn class="ma-2" color="blue" icon="mdi-wrench"></v-btn>
                        <!-- <v-label class="text-black text-h6 align-self-end">Cambiar </v-label> -->
                    </div>

                </div>
                <div class="  d-flex align-center justify-space-evenly centrar">
                    <v-label class="ancho-label text-black text-h4 mr-auto">Estado : </v-label>
                    <div class="d-flex flex-1-1 justify-center ga-5">
                        <v-label class="text-black text-h4 text-bold">{{ incidenciasStore.incidenciaActualizar.estado
                            }}</v-label>
                        <v-btn class="ma-2" color="blue" icon="mdi-wrench"></v-btn>
                        <!-- <v-label class="text-black text-h6 align-self-end">Cambiar </v-label> -->
                    </div>

                </div>

            </v-card-text>
        </v-card>
    </v-navigation-drawer>

</template>

<style lang="scss" scoped></style>