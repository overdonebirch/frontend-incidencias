const urlBack = "http://localhost:8000/incidencias";

export const IncidenciaService = () => {

    async function obtenerIncidencias() {
        const datos = await fetch(urlBack);
        const resJson = await datos.json();
        return resJson;
    }
   
    function eliminarIncidencia(id) {
        try {
            fetch(`${urlBack}/${id}`, {
                method: 'DELETE'
            })
        }
        catch (error) {
            console.log(error);
        }
    }
    async function crearIncidencia(datos) {
        const response = await agregarDatos(urlBack,datos,"POST");
        return response;
    }
    async function actualizarIncidencia(datos,id) {
        const url = `${urlBack}/${id}`;
        const response = await agregarDatos(url,datos,"PATCH");
        return response;
    }

    const agregarDatos = async (url,datos,metodo) => {
        try {
            const response = await fetch(url, {
                method: metodo,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(datos),
            })
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }

    return {
        eliminarIncidencia,
        obtenerIncidencias,
        crearIncidencia,
        actualizarIncidencia
    }
}