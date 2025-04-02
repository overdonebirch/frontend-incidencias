<script setup>
    import { ref, reactive, computed } from 'vue'
    const incidencia = defineModel('incidencia');
    const emits = defineEmits(['handleSubmit'])
    const urgencias = ref(['Muy Urgente', 'Urgente', 'Media', 'Baja'])
    const reglasTexto = [
        value => Boolean(value) || 'El campo es necesario',
    ]
    const textoSubmit = computed(() => {
        return incidencia.value.id ? "Actualizar Incidencia" : "Agregar Incidencia";
    })
</script>


<template>
    <v-form class="pa-10" @submit.prevent="$emit('handleSubmit', $event)">
        <v-row>
            <v-col cols="12" class="pa-0">
                <v-text-field 
                    required 
                    v-model="incidencia.nombre"
                    label="Nombre de Incidencia"
                    :rules="reglasTexto"
                    variant="outlined"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="pa-0">
                <v-text-field 
                    v-model="incidencia.descripcion"
                    label="Descripción de Incidencia" 
                    :rules="reglasTexto" 
                    required
                    variant="outlined"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="pa-0">
                <v-select 
                     v-model="incidencia.urgencia"
                    :items="urgencias" 
                    label="Selecciona urgencia"
                    variant="outlined"
                ></v-select>
            </v-col>
            <v-col cols="12" class="pa-0 text-end ">
                <v-btn class="mx-auto" type="submit">{{ textoSubmit }}</v-btn>
            </v-col>
        </v-row>
    </v-form>
</template>

<style lang="scss" scoped></style>