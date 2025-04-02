<script setup>

import { ref, reactive, computed } from 'vue'
import { generarId } from "./helpers/generarId.js";
import Incidencia from './components/Incidencia.vue';
import Formulario from './components/Formulario.vue';

const valid = ref(false)

const incidencia = reactive({
  id: '',
  nombre: 'asdasd',
  descripcion: '',
  urgencia: ''
})

const listaIncidencias = ref([]);


const urlBack = "http://localhost:8000/incidencias";

const mostrarIncidencias = async () => {
  const datos = await fetch(urlBack);
  const resJson = await datos.json();
  listaIncidencias.value = resJson;
}


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
  const datos = { nombre: incidencia.nombre, descripcion: incidencia.descripcion, urgencia: incidencia.urgencia };
  console.log(url);
  console.log(datos);
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    })
    const incidenciaActualizar = listaIncidencias.value.find(item => item.id === incidencia.id);
    Object.assign(incidenciaActualizar, datos);
    e.target.reset();
    const resJson = await response.json();
    const { message } = resJson;
    alert(message)
    incidencia.id = '';
  }
  catch (error) {
    console.log(error)
  }

}

const handleSubmit = async (e) => {
  const datos = { id: generarId(), nombre: incidencia.nombre, descripcion: incidencia.descripcion, urgencia: incidencia.urgencia };
  if (incidencia.id) {
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
    listaIncidencias.value.push({ ...datos });
    e.target.reset();
    const resJson = await response.json();
    const { message } = resJson;
    alert(message)

  }
  catch (error) {
    console.log(error);
  }
}



</script>

<template>
  <v-app>
    <v-container class="pt-10" style="max-width: 800px">
      <Formulario
      v-model:incidencia="incidencia"

      @handleSubmit="handleSubmit"
      ></Formulario>
      <v-row>
        <v-col cols="12" class="pa-0 mt-16 text-start">
          <v-btn class="text-center" @click="mostrarIncidencias">Mostrar Incidencias</v-btn>
        </v-col>
        <v-sheet>

        </v-sheet>
      </v-row>
      <v-row>
        <v-col col="12">
          <Incidencia v-for="incidencia in listaIncidencias" :incidencia="incidencia"
            @eliminarIncidencia="eliminarIncidencia" @modoActualizar="modoActualizar" />
        </v-col>
      </v-row>

    </v-container>
  </v-app>
</template>

<style>

</style>