import { reactive, ref } from "vue"
import { defineStore } from "pinia";

export const useAlertasStore = defineStore('alertas', () => {
    const listaAlertas = ref([]);
    let contadorId = 0;
    
    function agregarAlerta(tipo, mensaje) {
        const id = contadorId++;
        const tiempo = 500 + (contadorId * 300);
        
        listaAlertas.value.push({ id, tipo, mensaje });
        setTimeout(() => {
            eliminarAlerta(id);
        }, tiempo);
    }
    
    function eliminarAlerta(id) {
        const index = listaAlertas.value.findIndex(alerta => alerta.id === id);
        if (index !== -1) {
            listaAlertas.value.splice(index, 1);
        }
    }
    
    return {
        listaAlertas,
        agregarAlerta
    }
})