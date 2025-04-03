import { defineStore } from "pinia";
import { reactive, ref } from "vue";


import { generarId } from "../helpers/generarId.js";
import { IncidenciaService } from "../services/incidenciasService.js";
import { validarCampos } from "../helpers/validarDatossChema.js";

export const useIncidenciasStore = defineStore('incidencias', () => {
    const urlBack = "http://localhost:8000/incidencias";
    const incidenciaService = IncidenciaService();
    const cargarFormulario = ref(false);
    const incidencia = reactive({
        id: '',
        nombre: '',
        descripcion: '',
        urgencia: ''
    })
    const listaIncidencias = ref([]);
    const jsonSchema = ref(null);

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
        const { id, nombre, descripcion, urgencia } = incidenciaEncontrada;
        Object.assign(incidencia, {
            id, nombre, descripcion, urgencia
        })
    }

    const handleSubmit = async (e) => {

        const datos = { 
            nombre: incidencia.nombre, 
            descripcion: incidencia.descripcion, 
            urgencia: incidencia.urgencia 
        };
        let response;
        
        if (incidencia.id) {
            response = await incidenciaService.actualizarIncidencia(datos, incidencia.id);
            const incidenciaActualizar = listaIncidencias.value.find(item => item.id === incidencia.id);
            Object.assign(incidenciaActualizar, datos);
            incidencia.id = '';
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
        alert(message);
    }

    return {
        incidencia,
        listaIncidencias,
        jsonSchema,
        cargarFormulario,
        eliminarIncidencia,
        modoActualizar,
        obtenerIncidencias,
        handleSubmit,
        obtenerSchema
    }
})