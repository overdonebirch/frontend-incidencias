<script setup>
import { ref } from 'vue';
import { useIncidenciasStore } from '../stores/incidenciasStore.js';
import { useDialogStore } from '../stores/dialogStore.js';
const dialogStore = useDialogStore();
const incidenciasStore = useIncidenciasStore();
const props = defineProps({
  titulo: {
    type: String,
    required: true
  },
  contenido: {
    type: String,
    required: true
  },
  colorTarjeta: {
    type: String,
    default: 'blue-lighten-5'
  },
  colorBotonPrincipal: {
    type: String,
    default: 'primary'
  },
  textoBotonPrincipal: {
    type: String,
    default: 'Confirmar'
  },
  textoBotonCancelar: {
    type: String,
    default: 'Cerrar'
  }
});

const emit = defineEmits(['cerrar', 'confirmar']);

const cerrarDialog = () => {
  emit('cerrar');
};

const confirmarAccion = () => {
  emit('confirmar');
};
</script>

<template>
  <v-dialog :model-value="dialogStore.mostrarDialog" @update:model-value="cerrarDialog">
    <v-card :color="colorTarjeta">
      <v-card-title>{{ titulo }}</v-card-title>
      <v-card-text>
        <slot name="contenido">
          {{ contenido }}
        </slot>
      </v-card-text>
      <v-card-actions>
        <v-btn :color="colorBotonPrincipal" @click="confirmarAccion" v-if="!incidenciasStore.incidenciaActualizar.id">{{ textoBotonPrincipal }}</v-btn>
        <v-btn @click="cerrarDialog">{{ textoBotonCancelar }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>