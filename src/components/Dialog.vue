<script setup>
const mostrarDialog = defineModel('mostrarDialog');
</script>

<template>
    <v-dialog v-model="mostrarDialog">
        <v-card>
            <v-card-title>Título del diálogo</v-card-title>
            <v-card-text>
                Contenido del diálogo
            </v-card-text>
            <v-card-actions>
                <v-btn @click="mostrarDialog = false">Cerrar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>