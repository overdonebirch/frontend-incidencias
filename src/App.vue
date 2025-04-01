

<script setup>

import { ref } from 'vue'

const valid = ref(false)
const nombre = ref('')
const descripcion = ref('')
const urgencia = ref(['Muy Urgente','Urgente','Medio','Bajo'])

const reglasTexto = [
  value => Boolean(value) || 'El campo es necesario',
]

</script>

<template>
  <v-app>
      <v-container class="pt-10" style="max-width: 800px">
        <v-form>
          <v-row>
            <v-col cols="12" class="pa-0">
              <v-text-field required v-model="nombre" label="Nombre de Incidencia" :rules="reglasTexto" ></v-text-field>
            </v-col>
            <v-col cols="12" class="pa-0">
              <v-text-field v-model="descripcion" label="Descipcion de Incidencia" :rules="reglasTexto" required ></v-text-field>
            </v-col>
            <v-col cols="12" class="pa-0">
              <v-select :items="urgencia" label="selecciona urgencia">
              </v-select>
            </v-col>
            <v-col  cols="12" class="pa-0 text-end ">
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