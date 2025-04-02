<script setup>
    import { ref, reactive, computed } from 'vue'
    const props = defineProps({
        id: {
            type: String,
            required: true
        },
        nombre: {
            type: String,
            required: true
        },
        descripcion: {
            type: String,
            required: true
        },
        urgencia: {
            type: String,
            required: true
        },
    })
    const emits = defineEmits(['update:nombre', 'update:descripcion', 'update:urgencia', 'handleSubmit'])

    const urgencias = ref(['Muy Urgente', 'Urgente', 'Media', 'Baja'])
    const reglasTexto = [
        value => Boolean(value) || 'El campo es necesario',
    ]
    const textoSubmit = computed(() => {
        return props.id ? "Actualizar Incidencia" : "Agregar Incidencia";
    })
</script>


<template>
    <v-form class="pa-10" @submit.prevent="$emit('handleSubmit', $event)">
        <v-row>
            <v-col cols="12" class="pa-0">
                <v-text-field 
                    required 
                    :model-value="nombre" 
                    label="Nombre de Incidencia"
                    @update:model-value="$emit('update:nombre', $event)" 
                    :rules="reglasTexto"
                    variant="outlined"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="pa-0">
                <v-text-field 
                    :model-value="descripcion" 
                    label="Descripción de Incidencia" 
                    :rules="reglasTexto" 
                    required
                    @update:model-value="$emit('update:descripcion', $event)"
                    variant="outlined"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="pa-0">
                <v-select 
                    :items="urgencias" 
                    :model-value="urgencia" 
                    label="Selecciona urgencia"
                    @update:model-value="$emit('update:urgencia', $event)"
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