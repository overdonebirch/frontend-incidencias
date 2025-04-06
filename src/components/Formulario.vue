<script setup>
import { ref, reactive, computed } from 'vue'
import { useIncidenciasStore } from '../stores/incidenciasStore';
const incidenciasStore = useIncidenciasStore();
const emits = defineEmits(['handleSubmit'])
const incidenciaNueva = reactive({
    id: '',
    titulo: '',
    descripcion: '',
    urgencia: ''
});
const props = defineProps({
    modo: {
        type: String,
        required: true
    }
})
const reglasTexto = [
    value => Boolean(value) || 'El campo es necesario',
]
const textoSubmit = computed(() => {
    if (props.modo == "Creacion")
        return "Agregar Incidencai"
    else if (props.modo == "Edicion")
        return "Actualizar Incidencia"
})
const incidenciaVinculada = computed(() => {
    if (props.modo == "Creacion")
        return incidenciaNueva
    else if (props.modo == "Edicion")
        return incidenciasStore.incidencia
})
const accionSubmit = computed(() => {
    if (props.modo == "Creacion")
        return incidenciasStore.crearIncidencia
    else if(props.modo == "Edicion"){
        return incidenciasStore.actualizarIncidencia
    }
})
</script>


<template>
    <v-form ref="formRef" class="pa-10" @submit.prevent="accionSubmit($event.target, incidenciaNueva)">
        <v-row>
            <v-col cols="12" class="pa-0">
                <v-text-field required v-model="incidenciaVinculada.titulo" label="Titulo de Incidencia"
                    :rules="reglasTexto" variant="outlined"></v-text-field>
            </v-col>
            <v-col cols="12" class="pa-0">
                <v-text-field v-model="incidenciaVinculada.descripcion" label="Descripción de Incidencia"
                    :rules="reglasTexto" required variant="outlined"></v-text-field>
            </v-col>
            <v-col cols="12" class="pa-0">
                <v-select v-model="incidenciaVinculada.urgencia" :items="incidenciasStore.urgencias"
                    label="Selecciona urgencia" variant="outlined"></v-select>
            </v-col>

            <v-col cols="12" class="pa-0 text-end">
                <v-btn class="mx-auto" type="submit">{{ textoSubmit }}</v-btn>
            </v-col>
        </v-row>
    </v-form>
</template>

<style lang="scss" scoped></style>