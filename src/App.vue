<script setup>

import { ref, reactive} from 'vue'

const valid = ref(false)

const incidencia = reactive({
  nombre : '',
  descripcion : '',
  urgencia : ''
})

const urgencias = ref(['Muy Urgente', 'Urgente', 'Media', 'Baja'])
const urlBack = "http://localhost:8000/incidencias";

const reglasTexto = [
  value => Boolean(value) || 'El campo es necesario',
]

const handleSubmit = async (e) => {

  const datos = { nombre: incidencia.nombre, descripcion : incidencia.descripcion, urgencia : incidencia.urgencia};

  const response = await fetch(urlBack, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  })
  e.target.reset();
  const resJson = await response.json();
  const {message} = resJson;
  alert(message)
}
</script>

<template>
  <v-app>
    <v-container class="pt-10" style="max-width: 800px">
      <v-form @submit.prevent="handleSubmit">
        <v-row>
          <v-col cols="12" class="pa-0">
            <v-text-field required v-model="incidencia.nombre" label="Nombre de Incidencia" :rules="reglasTexto"></v-text-field>
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
            <v-btn class="mx-auto " type="submit">Agregar Incidencia</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </v-app>
</template>

<style>
/* No se necesitan estilos adicionales - usamos las clases de Vuetify */
</style>