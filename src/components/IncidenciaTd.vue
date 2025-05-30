<script setup>
import { ref, computed } from 'vue';
import { useIncidenciasStore } from '../stores/incidenciasStore';
import { useDialogStore } from '../stores/dialogStore.js';
import { formatearFecha } from '../helpers/formatearFecha.js';
import Dialog from './Dialog.vue';
import Formulario from './Formulario.vue';
import { useAuthStore } from '../stores/authStore.js'
import { mapearColorUrgencia } from '../helpers/incidencias/colorUrgencia.js';
import { mapearColorEstado } from '../helpers/incidencias/colorEstado.js';

const incidenciasStore = useIncidenciasStore();
const dialogStore = useDialogStore();
const authStore = useAuthStore();

const props = defineProps({
  incidencia: {
    type: Object,
    required: true
  }
});



const tipoDialog = ref('');
const colorUrgencia = computed(() => mapearColorUrgencia(props.incidencia.urgencia));
const colorEstado = computed(() => mapearColorEstado(props.incidencia.estado));

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


  <!-- Usar el componente de diálogo genérico -->
  <Dialog v-if="tipoDialog" :titulo="configDialog.titulo" :contenido="configDialog.contenido"
    :colorTarjeta="configDialog.colorTarjeta" :colorBotonPrincipal="configDialog.colorBotonPrincipal"
    :textoBotonPrincipal="configDialog.textoBotonPrincipal" @cerrar="cerrarDialog" @confirmar="confirmarAccion">
    <!-- Usando el slot para insertar el formulario cuando sea necesario -->
    <template v-if="configDialog.mostrarFormulario" #contenido>
      <Formulario modo="Edicion" />
    </template>
  </Dialog>

  <td> {{ incidencia.titulo }} </td>
  <td> {{ incidencia.descripcion }}</td>
  <td>
    <v-sheet class="elevation-1  text-white text-center rounded-sm font-weight-bold" :color="colorUrgencia">
      {{ incidencia.urgencia }}
    </v-sheet>
  </td>
  <td>
    <v-sheet class="elevation-1  text-white text-center rounded-sm font-weight-bold" :color="colorEstado">
      {{ incidencia.estado }}
    </v-sheet>
  </td>
  <td> {{ formatearFecha(incidencia.created_at) }}</td>
  <td v-if="authStore.tienePermisoWildcard('incidencias.edit')"> <v-btn color="blue-lighten-4"
      @click="abrirDialogActualizar"> <v-icon icon="mdi-wrench"></v-icon> Editar</v-btn></td>

  <td v-if="authStore.tienePermisoWildcard('incidencias.delete')"> <v-btn color="deep-orange-lighten-3"
      @click="abrirDialogEliminar"> <v-icon icon="mdi-minus-circle"></v-icon>Eliminar</v-btn></td>

</template>

<style scoped>


</style>