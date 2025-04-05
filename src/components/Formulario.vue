<script setup>
    import { ref, reactive, computed } from 'vue'
    import { useIncidenciasStore } from '../stores/incidenciasStore';
    const incidenciasStore = useIncidenciasStore();
    const emits = defineEmits(['handleSubmit'])

    const reglasTexto = [
        value => Boolean(value) || 'El campo es necesario',
    ]
    const textoSubmit = computed(() => {
        return incidenciasStore.incidencia.id ? "Actualizar Incidencia" : "Agregar Incidencia";
    })
</script>


<template>
    <v-form  ref="formRef" class="pa-10" @submit.prevent="incidenciasStore.handleSubmit">
        <v-row>
            <v-col cols="12" class="pa-0">
                <v-text-field 
                    required 
                    v-model="incidenciasStore.incidencia.titulo"
                    label="Titulo de Incidencia"
                    :rules="reglasTexto"
                    variant="outlined"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="pa-0">
                <v-text-field 
                    v-model="incidenciasStore.incidencia.descripcion"
                    label="Descripción de Incidencia" 
                    :rules="reglasTexto" 
                    required
                    variant="outlined"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="pa-0">
                <v-select 
                     v-model="incidenciasStore.incidencia.urgencia"
                    :items="incidenciasStore.urgencias" 
                    label="Selecciona urgencia"
                    variant="outlined"
                ></v-select>
            </v-col>

            <v-col cols="12" class="pa-0 text-end">
                <v-btn class="mr-3 " color="deep-orange-lighten-3" v-if="incidenciasStore.incidencia.id"
                @click="incidenciasStore.modoAgregar()">Cancelar Actualizacion</v-btn>
                <v-btn class="mx-auto" type="submit">{{ textoSubmit }}</v-btn>
 
            </v-col>
        </v-row>
    </v-form>
</template>

<style lang="scss" scoped></style>