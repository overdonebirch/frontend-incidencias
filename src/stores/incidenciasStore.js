import { defineStore } from "pinia";
import { reactive, ref, watch } from "vue";
import { useAlertasStore } from "../stores/alertasStore";
import { generarId } from "../helpers/generarId.js";
import { IncidenciaService } from "../services/incidenciasService.js";
import { validarCampos } from "../helpers/validarDatossChema.js";
import { ordenarPorUrgenciaSeleccionada, ordenarPorUrgenciasEstandar } from "../helpers/incidencias/filtrarUrgencia.js";
import { ordenarPorFechas } from "../helpers/incidencias/filtrarFechas.js";

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
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Para un desplazamiento suave
        });
    }
    const modoAgregar = (e) => {
        console.log(e);
        Object.assign(incidencia, {
            id: '',
            titulo: '',
            descripcion: '',
            urgencia: ''
        })
    }
    const crearIncidencia = async (e, incidenciaNueva) => {
        debugger;
        const nuevoId = generarId();
        incidenciaNueva.id = nuevoId;

        //Se validan los inputs del form con el esquema :
        if (!validarCampos(jsonSchema.value, incidenciaNueva)) {
            return;
        }
        //Obtengo la incidencia y su fecha de creacion desde el backend
        const response = await incidenciaService.crearIncidencia(incidenciaNueva);
        const resJson = await response.json();
        const incidenciaCreada = resJson.incidencia
        incidenciaNueva.created_at = incidenciaCreada.created_at;

        listaIncidencias.value.push({ ...incidenciaNueva });
  
        limpiarCamposIncidencia(incidenciaNueva);
        e.reset();
        const { message } = resJson;
        alertasStore.agregarAlerta("success", message);
    }
    const actualizarIncidencia = async (e) => {

        const datos = {
            titulo: incidencia.titulo,
            descripcion: incidencia.descripcion,
            urgencia: incidencia.urgencia
        };
        let response;
        let resJson;
        if (incidencia.id) {
            response = await incidenciaService.actualizarIncidencia(datos, incidencia.id);
            if (!response.error) {
                const incidenciaActualizar = listaIncidencias.value.find(item => item.id === incidencia.id);
                Object.assign(incidenciaActualizar, datos);
                incidencia.id = '';
            }
            resJson = await response.json();
        }
        e.target.reset();
        const { message } = resJson;
        alertasStore.agregarAlerta("success", message);
    }
    function limpiarCamposIncidencia(incidencia) {
        // Eliminar todas las propiedades del objeto
        Object.keys(incidencia).forEach(key => {
            delete incidencia[key];
        });
    
        // Asignar solo las propiedades deseadas
        incidencia.id = '';
        incidencia.titulo = '';
        incidencia.descripcion = '';
        incidencia.urgencia = '';
    }
    
    function filtrarPorUrgencia(urgenciaSeleccionada) {
        ordenarPorUrgenciaSeleccionada(listaIncidencias.value, urgenciaSeleccionada);
    }
    function filtrarPorFechas(orden) {
        ordenarPorFechas(listaIncidencias.value, orden)
    }

    return {
        incidencia,
        listaIncidencias,
        jsonSchema,
        cargarFormulario,
        urgencias,
        urgenciasDisponibles,
        crearIncidencia,
        eliminarIncidencia,
        modoActualizar,
        modoAgregar,
        obtenerIncidencias,
        obtenerSchema,
        filtrarPorUrgencia,
        filtrarPorFechas
    }
})