import Ajv from "ajv"
const ajv = new Ajv();

export const validarCampos = (schema,datos) => {
    const validar = ajv.compile(schema);
    const esValido = validar(datos);
    if(!esValido){
        console.log(validar.errors);
        return false;
    }
    return true;
}

