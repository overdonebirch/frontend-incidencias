<script setup>
import { ref, reactive, computed } from 'vue';
import Header from './Header.vue';
const drawer = ref(false);
const altura = computed(() => drawer.value ? 'h-screen' : '');

</script>

<template>
    <v-container fluid class="pa-0">

        <v-app-bar color="indigo-darken-3">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </v-app-bar>

        <v-navigation-drawer color="indigo" v-model="drawer" :location="$vuetify.display.mobile ? 'bottom' : undefined"
            :class="altura">
            <v-list class=" h-100 d-flex flex-column justify-start ga-3 pt-16">
                <v-list-item>
                    <RouterLink class="text-decoration-none text-h5 text-cyan-lighten-5 font-weight-bold"
                        :to="{ name: 'crear-incidencia' }">Crear Incidencia</RouterLink>
                </v-list-item>
                <v-list-item>
                    <RouterLink class="text-decoration-none text-h5 text-cyan-lighten-5 font-weight-bold"
                        :to="{ name: 'listar-incidencias' }">Listar Incidencias</RouterLink>
                </v-list-item>


            </v-list>
        </v-navigation-drawer>

        <v-main>
            <v-container class="d-flex flex-column ga-10 align-center">
                <slot name="title" />
                <v-row>
                    <slot name="body" />
                </v-row>
                <v-row>
                    <slot name="footer" />
                </v-row>
            </v-container>
        </v-main>
    </v-container>
</template>
<style>
.min-h-screen {
    min-height: 90vh;
}
</style>