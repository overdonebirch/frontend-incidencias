
export const IncidenciaService = () => {
    let urlGet = new URL("http://localhost:8000/incidencias");
    let urlEstatica = "http://localhost:8000/incidencias";

    function seleccionarPagina(pageNumber){
        if(pageNumber){
            urlGet.searchParams.set("page", pageNumber);
        }  
    }
    function cambiarPaginacion(perPage){
        if(perPage){
            urlGet.searchParams.set("perPage", perPage);
        }  
    }
    function seleccionarUrgencia(urgencia){
        if(urgencia){
            urlGet.searchParams.set("urgencia", urgencia);
        }  
    }
    function seleccionarAntiguedad(fecha){
        if(fecha){
            urlGet.searchParams.set("fecha", fecha);
        }  
    }

    async function obtenerIncidencias() {
        const datos = await fetch(urlGet);
        const resJson = await datos.json();
        return resJson;
    }

    async function obtenerSchema() {
        const datos = await fetch(`${urlEstatica}/jsonschema`);
        const schema = await datos.json();
        return schema;
    }
   
    async function obtenerUrgenciasExistentes() {
        const datos = await fetch(`${urlEstatica}/urgencias`);
        const urgencias = await datos.json();
        return urgencias;
    }
    function eliminarIncidencia(id) {
        try {
            fetch(`${urlEstatica}/${id}`, {
                method: 'DELETE'
            })
        }
        catch (error) {
            console.log(error);
        }
    }

    async function crearIncidencia(datos) {
        const response = await agregarDatos(urlEstatica,datos,"POST");
        return response;
    }

    async function actualizarIncidencia(datos,id) {
        const url = `${urlEstatica}/${id}`;
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
            return error;
        }
    }

    return {
        eliminarIncidencia,
        obtenerIncidencias,
        obtenerUrgenciasExistentes,
        crearIncidencia,
        actualizarIncidencia,
        obtenerSchema,
        seleccionarPagina,
        seleccionarUrgencia,
        seleccionarAntiguedad,
        cambiarPaginacion
    }
}