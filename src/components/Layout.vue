<script setup>
import LeftSideBar from './LeftSideBar.vue';
import Header from './Header.vue';
</script>

<template>
    <v-container fluid class="pa-0">
        <v-row>
            <v-col cols="2">
                <LeftSideBar class="h-screen">
                    <v-list class=" h-100 d-flex flex-column justify-center ">
                        <v-list-item>
                            <RouterLink class="text-decoration-none text-h5 text-cyan-lighten-5 font-weight-bold"
                                :to="{ name: 'crear-incidencia' }">Crear Incidencia</RouterLink>
                        </v-list-item>
                        <v-list-item>
                            <RouterLink class="text-decoration-none text-h5 text-cyan-lighten-5 font-weight-bold"
                                :to="{ name: 'listar-incidencias' }">Listar Incidencias</RouterLink>
                        </v-list-item>

                    </v-list>
                </LeftSideBar>
            </v-col>
            <v-col cols="10">
                <v-row justify="center">
                    <v-col cols="12" class="d-flex flex-column align-center">

                        <slot name="title">

                        </slot>

                        <v-row class="mt-15" justify="center">

                            <slot name="body">

                            </slot>

                        </v-row>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>
<style lang="scss" scoped></style>