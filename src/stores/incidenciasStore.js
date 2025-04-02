import { defineStore } from "pinia";
import { reactive, ref } from "vue";

const urlBack = "http://localhost:8000/incidencias";
import { generarId } from "../helpers/generarId.js";

export const useIncidenciasStore = defineStore('incidencias', () => {
    const incidencia = reactive({
        id: '',
        nombre: 'asdasd',
        descripcion: '',
        urgencia: ''
    })
    const listaIncidencias = ref([]);

    async function obtenerIncidencias() {
        const datos = await fetch(urlBack);
        const resJson = await datos.json();
        listaIncidencias.value = resJson;
    }

    function eliminarIncidencia(id) {
        try {
            fetch(`${urlBack}/${id}`, {
                method: 'DELETE'
            })
            listaIncidencias.value = listaIncidencias.value.filter(item => item.id != id);
        }
        catch (error) {
            console.log(error);
        }
    }

    const modoActualizar = (idInci) => {
        const incidenciaEncontrada = listaIncidencias.value.find(item => item.id == idInci);
        const { id, nombre, descripcion, urgencia } = incidenciaEncontrada;
        Object.assign(incidencia, {
            id, nombre, descripcion, urgencia
        })
    }


    const handleSubmit = async (e) => {
        const datos = { id: generarId(), nombre: incidencia.nombre, descripcion: incidencia.descripcion, urgencia: incidencia.urgencia };
        if (incidencia.id) {
            actualizarIncidencia(e);
            return;
        }
        try {
            const response = await fetch(urlBack, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(datos),
            })
            listaIncidencias.value.push({ ...datos });
            e.target.reset();
            const resJson = await response.json();
            const { message } = resJson;
            alert(message)

        }
        catch (error) {
            console.log(error);
        }
    }

    const actualizarIncidencia = async (e) => {
        const url = `${urlBack}/${incidencia.id}`;
        const datos = { nombre: incidencia.nombre, descripcion: incidencia.descripcion, urgencia: incidencia.urgencia };
        try {
            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(datos),
            })
            const incidenciaActualizar = listaIncidencias.value.find(item => item.id === incidencia.id);
            Object.assign(incidenciaActualizar, datos);
            e.target.reset();
            const resJson = await response.json();
            const { message } = resJson;
            alert(message)
            incidencia.id = '';
        }
        catch (error) {
            console.log(error)
        }

    }


    return {
        incidencia,
        listaIncidencias,
        eliminarIncidencia,
        modoActualizar,
        obtenerIncidencias,
        handleSubmit,
        actualizarIncidencia
    }
})