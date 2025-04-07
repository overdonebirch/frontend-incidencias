
export const IncidenciaService = () => {
    let urlGet = new URL("http://localhost:8000/incidencias");
    let urlPost = "http://localhost:8000/incidencias";

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

    async function obtenerIncidencias() {
   
        console.log(urlGet);
        const datos = await fetch(urlGet);
        const resJson = await datos.json();
        return resJson;
        
    }

    async function obtenerSchema() {
        const datos = await fetch(`${urlPost}/jsonschema`);
        const schema = await datos.json();
        return schema;
    }
   
    function eliminarIncidencia(id) {
        try {
            fetch(`${urlPost}/${id}`, {
                method: 'DELETE'
            })
        }
        catch (error) {
            console.log(error);
        }
    }

    async function crearIncidencia(datos) {
        const response = await agregarDatos(urlPost,datos,"POST");
        return response;
    }

    async function actualizarIncidencia(datos,id) {
        const url = `${urlPost}/${id}`;
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
        crearIncidencia,
        actualizarIncidencia,
        obtenerSchema,
        seleccionarPagina,
        cambiarPaginacion
    }
}