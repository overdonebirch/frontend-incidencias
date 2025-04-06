<script setup>
import { useAlertasStore } from '../stores/alertasStore';

const alertasStore = useAlertasStore();
</script>

<template>
    <div class="global-alerts">
        <v-alert v-for="(alerta, index) in alertasStore.listaAlertas" :key="index" :title="alerta.tipo"
            :type="alerta.tipo" :text="alerta.mensaje" class="mb-3 global-alert" elevation="6">
        </v-alert>
    </div>
</template>


<style scoped>
.global-alerts {
    position: fixed;
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    max-width: 500px;
    z-index: 9999;
    pointer-events: none;
}

.global-alert {
    pointer-events: auto;
}
</style>