const urlBack = "http://localhost:8000/incidencias";

export const IncidenciaService = () => {

    async function obtenerIncidencias(pageNumber = null) {
        let url = urlBack;
        if(pageNumber){
            url = `${urlBack}/?page=${pageNumber}`
            console.log(url)
        }  
        const datos = await fetch(url);
        const resJson = await datos.json();
        return resJson;
        
    }

    async function obtenerSchema() {
        const datos = await fetch(`${urlBack}/jsonschema`);
        const schema = await datos.json();
        return schema;
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
            return error;
        }
    }

    return {
        eliminarIncidencia,
        obtenerIncidencias,
        crearIncidencia,
        actualizarIncidencia,
        obtenerSchema
    }
}