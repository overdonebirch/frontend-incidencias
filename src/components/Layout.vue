<script setup>
import { ref, reactive, computed, watch } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useAlertasStore } from '../stores/alertasStore';
import Header from './Header.vue';

const authStore = useAuthStore();
const alertasStore = useAlertasStore();
const drawer = ref(false);
const altura = computed(() => drawer.value ? 'h-screen' : '');
import { useRouter } from 'vue-router';
const router = useRouter();

const textLogin = computed(() => authStore.sesionIniciada() ? 'Ver Perfil' : 'Login' );
const rutaUser = computed(() => authStore.sesionIniciada() ? 'perfil' : 'login' );

const logout  = async () =>{

    try {
        await authStore.logout();
        router.push({name : 'crear-incidencia'});
        drawer.value = false;
        alertasStore.agregarAlerta("success","Te has deslogado");
    }
    catch(error){
        drawer.value = false;
        alertasStore.agregarAlerta("error",error.message);
    }

}

</script>

<template>
    <v-container fluid class="pa-0">

        <v-app-bar color="indigo-darken-3">

            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-app-bar-title><i>Gestion De Incidencias</i></v-app-bar-title>
            <template v-slot:append v-if="authStore.sesionIniciada()">
                <div class="text-h5">
                    Hola, {{ authStore.user.name }}
                </div>
            </template>
        </v-app-bar>

        <v-navigation-drawer color="indigo" class="pt-16" v-model="drawer" :location="$vuetify.display.mobile ? 'bottom' : undefined "
            :class="altura"
            >
            <v-list class=" h-100 d-flex flex-column justify-start align-center  align-lg-start ga-7 ga-lg-3 pt-16" >
                <v-list-item>
                    <RouterLink class="text-decoration-none text-h4 text-lg-h5 text-cyan-lighten-5 font-weight-bold"
                        :to="{ name: 'crear-incidencia' }">Crear Incidencia</RouterLink>
                </v-list-item>
                <v-list-item >
                    <RouterLink class="text-decoration-none text-h4 text-lg-h5 text-cyan-lighten-5 font-weight-bold"
                        :to="{ name: 'listar-incidencias' }">Listar Incidencias</RouterLink>
                </v-list-item>
                <v-list-item>
                    <RouterLink class="text-decoration-none text-h4 text-lg-h5 text-cyan-lighten-5 font-weight-bold"
                        :to="{ name: rutaUser }">{{textLogin}}</RouterLink>
                </v-list-item>
                <v-list-item v-if="authStore.sesionIniciada()">
                    <v-btn @click="logout">Logout</v-btn>
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