import { defineStore } from "pinia";
import { reactive, ref, watch } from "vue";
import { useAlertasStore } from "../stores/alertasStore";
import { generarId } from "../helpers/generarId.js";
import { IncidenciaService } from "../services/incidenciasService.js";
import { validarCampos } from "../helpers/validarDatossChema.js";
import { ordenarPorUrgenciaSeleccionada, ordenarPorUrgenciasEstandar } from "../helpers/incidencias/filtrarUrgencia.js";
import { ordenarPorFechas } from "../helpers/incidencias/filtrarFechas.js";
import { ca } from "vuetify/locale";
import { useDialogStore } from "./dialogStore.js";
export const useIncidenciasStore = defineStore('incidencias', () => {

    const alertasStore = useAlertasStore();
    const urlBack = "http://localhost:8000/incidencias";
    const incidenciaService = IncidenciaService();
    const cargarFormulario = ref(false);
    const cargarIncidencias = ref(false);
    const urgencias = ref(['Muy Alta', 'Alta', 'Media', 'Baja']) //El listado de todas las urgencias posibles
    const urgenciasDisponibles = ref(null) // El listado de las urgencias solo de las incidencias creadas
    const dialogStore = useDialogStore();
    const jsonSchema = ref(null);
    const totalPaginas = ref(null);
    const listaIncidencias = ref([]);
    const incidenciaActualizar = reactive({
        id: '',
        titulo: '',
        descripcion: '',
        urgencia: ''
    })


   
    async function obtenerSchema() {
        jsonSchema.value = await incidenciaService.obtenerSchema();
        cargarFormulario.value = true;
    }
    
    async function obtenerIncidencias() {
        cargarIncidencias.value = false;
        const datos = await incidenciaService.obtenerIncidencias();
        const {data,last_page} = datos;
        
        //Obtengo las urgencias cada vez que cargo todas las incidencias : 
        urgenciasDisponibles.value = await incidenciaService.obtenerUrgenciasExistentes();


        totalPaginas.value = last_page;
        listaIncidencias.value = data;
        cargarIncidencias.value = true;
    }

    function eliminarIncidencia(id) {
        incidenciaService.eliminarIncidencia(id);
        listaIncidencias.value = listaIncidencias.value.filter(item => item.id != id);
        alertasStore.agregarAlerta("success", "Incidencia Eliminada");
    }

    const modoActualizar = (idInci) => {
        const incidenciaEncontrada = listaIncidencias.value.find(item => item.id == idInci);
        const { id, titulo, descripcion, urgencia } = incidenciaEncontrada;
        Object.assign(incidenciaActualizar, {
            id, titulo, descripcion, urgencia
        })
    }
    const crearIncidencia = async (e, incidenciaNueva) => {
        const nuevoId = generarId();
        incidenciaNueva.id = nuevoId;

        //Se validan los inputs del form con el esquema :
        if (!validarCampos(jsonSchema.value, incidenciaNueva)) {
            return;
        }
        //Obtengo la incidencia y su fecha de creacion desde el backend
        try {
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
        catch (error) {
            console.log(error)
        }

    }

    const actualizarIncidencia = async (e,incidenciaActualizar) => {
        console.log(e);

        let response;
        let resJson;
        if (incidenciaActualizar.id) {
            try {
                response = await incidenciaService.actualizarIncidencia(incidenciaActualizar, incidenciaActualizar.id);
                const incidencia = listaIncidencias.value.find(item => item.id === incidenciaActualizar.id);
                Object.assign(incidencia, incidenciaActualizar);
                limpiarCamposIncidencia(incidenciaActualizar);
                resJson = await response.json();
                // e.reset();
                const { message } = resJson;
                alertasStore.agregarAlerta("success", message);
                e.reset();
                dialogStore.mostrarDialog = false;
            }
            catch (error) {
                console.log(error)
            }
        }


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

    function seleccionarPagina(pagina){
        incidenciaService.seleccionarPagina(pagina);
        obtenerIncidencias();
    }
    function cambiarPaginacion(perPage){
        incidenciaService.cambiarPaginacion(perPage);
        obtenerIncidencias();
    }
    function filtrarPorUrgencia(urgenciaSeleccionada) {
        urgenciaSeleccionada = urgenciaSeleccionada.trim();
        incidenciaService.seleccionarUrgencia(urgenciaSeleccionada);
        obtenerIncidencias();
    }

    function filtrarPorFechas(orden) {
        ordenarPorFechas(listaIncidencias.value, orden)
    }

    return {
        incidenciaActualizar,
        listaIncidencias,
        jsonSchema,
        cargarFormulario,
        urgencias,
        urgenciasDisponibles,
        totalPaginas,
        cargarIncidencias,
        limpiarCamposIncidencia,
        crearIncidencia,
        actualizarIncidencia,
        eliminarIncidencia,
        modoActualizar,
        obtenerIncidencias,
        obtenerSchema,
        filtrarPorUrgencia,
        filtrarPorFechas,
        seleccionarPagina,
        cambiarPaginacion
    }
})