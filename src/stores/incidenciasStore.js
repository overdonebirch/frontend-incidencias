import { defineStore } from "pinia";
import { reactive, ref, watch } from "vue";

import { useAlertasStore } from "../stores/alertasStore";
import { generarId } from "../helpers/generarId.js";
import { IncidenciaService } from "../services/incidenciasService.js";
import { validarCampos } from "../helpers/validarDatossChema.js";
import { ordenarPorUrgenciaSeleccionada,ordenarPorUrgenciasEstandar } from "../helpers/incidencias/filtrarUrgencia.js";

export const useIncidenciasStore = defineStore('incidencias', () => {
    const alertasStore = useAlertasStore();
    const urlBack = "http://localhost:8000/incidencias";
    const incidenciaService = IncidenciaService();
    const cargarFormulario = ref(false);
    const urgencias = ref(['Muy Alta', 'Alta', 'Media', 'Baja']) //El listado de todas las urgencias posibles
    const urgenciasDisponibles = ref(null) // El listado de las urgencias solo de las incidencias creadas

    const incidencia = reactive({
        id: '',
        titulo: '',
        descripcion: '',
        urgencia: ''
    })
    const listaIncidencias = ref([]);
    const jsonSchema = ref(null);

    watch(listaIncidencias, () => {
        urgenciasDisponibles.value = [...new Set(listaIncidencias.value.map(item => item.urgencia))]
        ordenarPorUrgenciasEstandar(urgenciasDisponibles.value);
    })
    async function obtenerSchema() {
        jsonSchema.value = await incidenciaService.obtenerSchema();
        cargarFormulario.value = true;
    }
    async function obtenerIncidencias() {

        listaIncidencias.value = await incidenciaService.obtenerIncidencias();
    }

    function eliminarIncidencia(id) {
        incidenciaService.eliminarIncidencia(id);
        listaIncidencias.value = listaIncidencias.value.filter(item => item.id != id);
    }

    const modoActualizar = (idInci) => {
        const incidenciaEncontrada = listaIncidencias.value.find(item => item.id == idInci);
        const { id, titulo, descripcion, urgencia } = incidenciaEncontrada;
        Object.assign(incidencia, {
            id, titulo, descripcion, urgencia
        })
    }

    const handleSubmit = async (e) => {

        const datos = { 
            titulo: incidencia.titulo, 
            descripcion: incidencia.descripcion, 
            urgencia: incidencia.urgencia 
        };
        let response;
        
        if (incidencia.id) {
            response = await incidenciaService.actualizarIncidencia(datos, incidencia.id);
            if(!response.error){
                const incidenciaActualizar = listaIncidencias.value.find(item => item.id === incidencia.id);
                Object.assign(incidenciaActualizar, datos);
                incidencia.id = '';
            }
        } 
        else {
            const nuevoId = generarId();
            datos.id = nuevoId;
            //Se validan los inputs del form con el esquema :

            if(!validarCampos(jsonSchema.value,datos)){
                return;
            } 
            response = await incidenciaService.crearIncidencia(datos);
            listaIncidencias.value.push({...datos});
        }
        

        e.target.reset();
        const resJson = await response.json();
        const { message } = resJson;
        alertasStore.agregarAlerta("success",message);
    }

    function filtrarPorUrgencia(urgenciaSeleccionada){
        ordenarPorUrgenciaSeleccionada(listaIncidencias.value,urgenciaSeleccionada);
    }

    return {
        incidencia,
        listaIncidencias,
        jsonSchema,
        cargarFormulario,
        urgencias,
        urgenciasDisponibles,
        eliminarIncidencia,
        modoActualizar,
        obtenerIncidencias,
        handleSubmit,
        obtenerSchema,
        filtrarPorUrgencia
    }
})