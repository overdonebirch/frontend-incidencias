export const validarCampos = (schema,datos) => {
    const esValido = schema(datos);
    if(!esValido){
        return false;
    }
    return true;
}

