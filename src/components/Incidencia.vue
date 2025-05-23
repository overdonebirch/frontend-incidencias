<script setup>
import { ref, computed } from 'vue';
import { useIncidenciasStore } from '../stores/incidenciasStore';
import { useDialogStore } from '../stores/dialogStore.js';
import { formatearFecha } from '../helpers/formatearFecha.js';
import Dialog from './Dialog.vue';
import Formulario from './Formulario.vue';

const incidenciasStore = useIncidenciasStore();
const dialogStore = useDialogStore();

const props = defineProps({
  incidencia: {
    type: Object,
    required: true
  }
});

const tipoDialog = ref('');

const abrirDialogEliminar = () => {
  tipoDialog.value = 'eliminar';
  dialogStore.mostrarDialog = true;
};

const abrirDialogActualizar = () => {
  incidenciasStore.modoActualizar(props.incidencia.id);
  tipoDialog.value = 'actualizar';
  dialogStore.mostrarDialog = true;
};

const cerrarDialog = () => {
  dialogStore.mostrarDialog = false;
  tipoDialog.value = '';
  incidenciasStore.limpiarCamposIncidencia(incidenciasStore.incidenciaActualizar);
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
  <v-sheet class="mb-5 d-flex justify-space-evenly pa-5" color="blue-lighten-4 rounded-lg">
    <!-- Usar el componente de diálogo genérico -->
    <Dialog
      v-if="tipoDialog"
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
      <div class="text-blue-grey-darken-1"><span class="font-weight-bold text text-light-blue-darken-4">Título:</span> {{ incidencia.titulo }}</div>
      <div class="text-blue-grey-darken-1"><span class="font-weight-bold text text-light-blue-darken-4">Descripcion:</span>{{ incidencia.descripcion }}</div>
      <div class="text-blue-grey-darken-1"><span class="font-weight-bold text text-light-blue-darken-4">Urgencia:</span>{{ incidencia.urgencia }}</div>
      <div class="text-blue-grey-darken-1"><span class="font-weight-bold text text-light-blue-darken-4">Fecha Alta:</span> {{ formatearFecha(incidencia.created_at) }}</div>
    </div>
    
    <div class="d-flex flex-column ga-2">
      <v-btn color="grey-lighten-2"@click="abrirDialogActualizar">Actualizar</v-btn>
      <v-btn color="deep-orange-lighten-3" @click="abrirDialogEliminar">Eliminar</v-btn>
    </div>
  </v-sheet>
</template>

<style lang="scss" scoped></style>