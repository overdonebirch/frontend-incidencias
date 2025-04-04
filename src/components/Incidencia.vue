<script setup>
import { ref,computed,reactive } from 'vue';
import { useIncidenciasStore } from '../stores/incidenciasStore';
import { formatearFecha } from '../helpers/formatearFecha.js';
const incidenciasStore = useIncidenciasStore();

const props = defineProps({
  incidencia: {
    type: Object,
    required: true
  }
})
const mostrarDialog = ref(false);
const opcionEliminar = ref(false);

const eliminarIncidencia = (id) => {
  incidenciasStore.eliminarIncidencia(id);
  mostrarDialog.value = false;
}

const camposDialog = computed(() => {
  if(opcionEliminar.value){
    return {
      titulo : "Eliminar Incidencia",
      contenido : `Estas seguro que quieres eliminar la incidencia con titulo : ${props.incidencia.titulo}?`,
      metodo : eliminarIncidencia

    }
  }
})
</script>


<template>
  <v-sheet class="mb-5 d-flex justify-space-evenly pa-5" color="blue-grey-lighten-4 rounded-lg">
    <v-dialog v-model="mostrarDialog" >
        <v-card color="red-lighten-5">
            <v-card-title>{{camposDialog.titulo}}</v-card-title>
            <v-card-text>
              {{camposDialog.contenido}}
            </v-card-text>
            <v-card-actions>
                <v-btn color="red" @click="camposDialog.metodo(incidencia.id)">Confirmar</v-btn>
                <v-btn @click="mostrarDialog = false">Cerrar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <div style="width: 500px;">
      <div>Titulo : {{ incidencia.titulo }}</div>
      <div>Descripcion : {{ incidencia.descripcion }}</div>
      <div>Urgencia : {{ incidencia.urgencia }}</div>
      <div>Fecha Alta : {{ formatearFecha(incidencia.created_at)}}</div>
    </div>
    <div class="d-flex flex-column ga-2">
      <v-btn @click="incidenciasStore.modoActualizar(incidencia.id)">Actualizar</v-btn>
      <v-btn color="deep-orange-lighten-3" @click="() => {mostrarDialog = !mostrarDialog; opcionEliminar = true}">Eliminar</v-btn>
    </div>

  </v-sheet>
</template>


<style lang="scss" scoped></style>