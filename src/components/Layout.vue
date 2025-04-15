<script setup>
import { ref, reactive, computed, watch } from 'vue';
import Header from './Header.vue';
const drawer = ref(false);
const altura = computed(() => drawer.value ? 'h-screen' : '');





</script>

<template>
    <v-container fluid class="pa-0">

        <v-app-bar color="indigo-darken-3">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </v-app-bar>

        <v-navigation-drawer color="indigo" class="pt-16" v-model="drawer" :location="$vuetify.display.mobile ? 'bottom' : undefined "
            :class="altura"
            >
            <v-list class=" h-100 d-flex flex-column justify-start align-center  align-lg-start ga-7 ga-lg-3 pt-16" >
                <v-list-item>
                    <RouterLink class="text-decoration-none text-h4 text-lg-h5 text-cyan-lighten-5 font-weight-bold"
                        :to="{ name: 'crear-incidencia' }">Crear Incidencia</RouterLink>
                </v-list-item>
                <v-list-item>
                    <RouterLink class="text-decoration-none text-h4 text-lg-h5 text-cyan-lighten-5 font-weight-bold"
                        :to="{ name: 'listar-incidencias' }">Listar Incidencias</RouterLink>
                </v-list-item>
                <v-list-item>
                    <RouterLink class="text-decoration-none text-h4 text-lg-h5 text-cyan-lighten-5 font-weight-bold"
                        :to="{ name: 'login' }">Login</RouterLink>
                </v-list-item>


            </v-list>
        </v-navigation-drawer>

        <v-main>
            <v-container class="d-flex flex-column ga-10 align-center">
                <slot name="title" />

                    <slot name="body" />
 

                    <slot name="footer" />

            </v-container>
        </v-main>
    </v-container>
</template>
<style>
.min-h-screen {
    min-height: 90vh;
}
</style>