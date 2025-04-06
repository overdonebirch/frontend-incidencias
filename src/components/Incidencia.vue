<script setup>
import { ref, computed } from 'vue';
import { useIncidenciasStore } from '../stores/incidenciasStore';
import { formatearFecha } from '../helpers/formatearFecha.js';
import Dialog from './Dialog.vue';
import Formulario from './Formulario.vue';

const incidenciasStore = useIncidenciasStore();

const props = defineProps({
  incidencia: {
    type: Object,
    required: true
  }
});

const mostrarDialog = ref(false);
const tipoDialog = ref('');

const abrirDialogEliminar = () => {
  tipoDialog.value = 'eliminar';
  mostrarDialog.value = true;
};

const abrirDialogActualizar = () => {
  incidenciasStore.modoActualizar(props.incidencia.id);
  tipoDialog.value = 'actualizar';
  mostrarDialog.value = true;
};

const cerrarDialog = () => {
  mostrarDialog.value = false;
  tipoDialog.value = '';
};

const confirmarAccion = () => {
  if (tipoDialog.value === 'eliminar') {
    incidenciasStore.eliminarIncidencia(props.incidencia.id);
  } else if (tipoDialog.value === 'actualizar') {
    cerrarDialog();
  }
  cerrarDialog();
};

const configDialog = computed(() => {
  if (tipoDialog.value === 'eliminar') {
    return {
      titulo: 'Eliminar Incidencia',
      contenido: `¿Estás seguro que quieres eliminar la incidencia con título: ${props.incidencia.titulo}?`,
      colorTarjeta: 'red-lighten-5',
      colorBotonPrincipal: 'red',
      textoBotonPrincipal: 'Eliminar',
      mostrarFormulario: false
    };
  } else if (tipoDialog.value === 'actualizar') {
    return {
      titulo: 'Actualizar Incidencia',
      contenido: '', // No usamos contenido de texto sino el componente
      colorTarjeta: 'blue-lighten-5',
      colorBotonPrincipal: 'primary',
      textoBotonPrincipal: 'Guardar',
      mostrarFormulario: true
    };
  }
  return {};
});
</script>

<template>
  <v-sheet class="mb-5 d-flex justify-space-evenly pa-5" color="blue-grey-lighten-4 rounded-lg">
    <!-- Usar el componente de diálogo genérico -->
    <Dialog
      v-if="tipoDialog"
      :mostrar="mostrarDialog"
      :titulo="configDialog.titulo"
      :contenido="configDialog.contenido"
      :colorTarjeta="configDialog.colorTarjeta"
      :colorBotonPrincipal="configDialog.colorBotonPrincipal"
      :textoBotonPrincipal="configDialog.textoBotonPrincipal"
      @cerrar="cerrarDialog"
      @confirmar="confirmarAccion"
    >
      <!-- Usando el slot para insertar el formulario cuando sea necesario -->
      <template v-if="configDialog.mostrarFormulario" #contenido>
        <Formulario modo="Edicion" />
      </template>
    </Dialog>
    
    <div style="width: 500px;">
      <div>Título: {{ incidencia.titulo }}</div>
      <div>Descripción: {{ incidencia.descripcion }}</div>
      <div>Urgencia: {{ incidencia.urgencia }}</div>
      <div>Fecha Alta: {{ formatearFecha(incidencia.created_at) }}</div>
    </div>
    
    <div class="d-flex flex-column ga-2">
      <v-btn @click="abrirDialogActualizar">Actualizar</v-btn>
      <v-btn color="deep-orange-lighten-3" @click="abrirDialogEliminar">Eliminar</v-btn>
    </div>
  </v-sheet>
</template>

<style lang="scss" scoped></style>