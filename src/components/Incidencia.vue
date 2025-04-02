<script setup>
    const props = defineProps({
        incidencia: {
            type: Object,
            required: true
        }
    })
    const emits = defineEmits(['eliminarIncidencia','modoActualizar'])
</script>


<template>
    <v-sheet class="mb-5 d-flex justify-space-evenly pa-5"
            color="blue-grey-lighten-4 rounded-lg">
            <div>
              <div>Nombre : {{ incidencia.nombre }}</div>
              <div>Descripcion : {{ incidencia.descripcion }}</div>
              <div>urgencia : {{ incidencia.urgencia }}</div>
            </div>
            <div class="d-flex flex-column ga-2">
              <v-btn @click="$emit('modoActualizar',incidencia.id)">Actualizar</v-btn>
              <v-btn color="deep-orange-lighten-3" 
              @click="$emit('eliminarIncidencia',incidencia.id)">Eliminar</v-btn>
            </div>

          </v-sheet>
</template>


<style lang="scss" scoped></style>