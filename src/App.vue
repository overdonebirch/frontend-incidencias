<script setup>

import { ref, reactive, computed } from 'vue'
import {generarId} from "./helpers/generarId.js";
const valid = ref(false)

const incidencia = reactive({
  id: '',
  nombre: '',
  descripcion: '',
  urgencia: ''
})

const listaIncidencias = ref([]);

const urgencias = ref(['Muy Urgente', 'Urgente', 'Media', 'Baja'])
const urlBack = "http://localhost:8000/incidencias";

const mostrarIncidencias = async () => {
  const datos = await fetch(urlBack);
  const resJson = await datos.json();
  listaIncidencias.value = resJson;
  console.log(resJson);
}

const reglasTexto = [
  value => Boolean(value) || 'El campo es necesario',
]

const eliminarIncidencia = (id) => {
  try {
    fetch(`${urlBack}/${id}`, {
      method: 'DELETE'
    })
    listaIncidencias.value = listaIncidencias.value.filter(item => item.id != id);
  }
  catch (error) {
    console.log(error);
  }
}

const modoActualizar = (idInci) => {
  const incidenciaEncontrada = listaIncidencias.value.find(item => item.id == idInci);
  const { id, nombre, descripcion, urgencia } = incidenciaEncontrada;
  Object.assign(incidencia, {
    id, nombre, descripcion, urgencia
  })
}

const actualizarIncidencia = async (e) => {
    const url = `${urlBack}/${incidencia.id}`;
    const datos = {nombre: incidencia.nombre, descripcion: incidencia.descripcion, urgencia: incidencia.urgencia };
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      })
      e.target.reset();
      const resJson = await response.json();
      const { message } = resJson;
      alert(message)
      incidencia.id = '';
    }
    catch(error){
      console.log(error)
    }
  
}

const handleSubmit = async (e) => {
  const datos = { id : generarId(), nombre: incidencia.nombre, descripcion: incidencia.descripcion, urgencia: incidencia.urgencia };
  if(incidencia.id){
    actualizarIncidencia(e);
    return;
  }
  try {
    const response = await fetch(urlBack, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    })
    listaIncidencias.value.push({...datos});
    e.target.reset();
    const resJson = await response.json();
    const { message } = resJson;
    alert(message)

  }
  catch (error) {
    console.log(error);
  }
}

const textoSubmit = computed(() => {
  return incidencia.id ? "Actualizar Incidencia" : "Agregar Incidencia";
})

</script>

<template>
  <v-app>
    <v-container class="pt-10" style="max-width: 800px">
      <v-form class="pa-10" @submit.prevent="handleSubmit">
        <v-row>
          <v-col cols="12" class="pa-0">
            <v-text-field required v-model="incidencia.nombre" label="Nombre de Incidencia"
              :rules="reglasTexto"></v-text-field>
          </v-col>
          <v-col cols="12" class="pa-0">
            <v-text-field v-model="incidencia.descripcion" label="Descipcion de Incidencia" :rules="reglasTexto"
              required></v-text-field>
          </v-col>
          <v-col cols="12" class="pa-0">
            <v-select :items="urgencias" v-model="incidencia.urgencia" label="selecciona urgencia">
            </v-select>
          </v-col>
          <v-col cols="12" class="pa-0 text-end ">
            <v-btn class="mx-auto " type="submit">{{ textoSubmit }}</v-btn>
          </v-col>
        </v-row>
      </v-form>
      <v-row>
        <v-col cols="12" class="pa-0 mt-16 text-start">
          <v-btn class="text-center" @click="mostrarIncidencias">Mostrar Incidencias</v-btn>
        </v-col>
        <v-sheet>

        </v-sheet>
      </v-row>
      <v-row>
        <v-col col="12">
          <v-sheet class="mb-5 d-flex justify-space-evenly pa-5" v-for="incidencia in listaIncidencias"
            color="blue-grey-lighten-4 rounded-lg">
            <div>
              <div>Nombre : {{ incidencia.nombre }}</div>
              <div>Descripcion : {{ incidencia.descripcion }}</div>
              <div>urgencia : {{ incidencia.urgencia }}</div>
            </div>
            <div class="d-flex flex-column ga-2">
              <v-btn @click="modoActualizar(incidencia.id)">Actualizar</v-btn>
              <v-btn color="deep-orange-lighten-3" @click="eliminarIncidencia(incidencia.id)">Eliminar</v-btn>
            </div>

          </v-sheet>
        </v-col>

      </v-row>

    </v-container>
  </v-app>
</template>

<style>
/* No se necesitan estilos adicionales - usamos las clases de Vuetify */
</style>