import Ajv from "ajv";
import ajvErrors from "ajv-errors";

const ajv = new Ajv({ 
  allErrors: true,
  strict: false 
});
ajvErrors(ajv);

export const validarCampos = (schema, datos) => {
  
    const validar = ajv.compile(schema);
    const esValido = validar(datos);
    
    if (!esValido) {
      const {errors} = validar;
      errors.forEach(error => {
        const {instancePath,message} = error;
        const campo = instancePath.replace("/","");
        console.log(campo,message);
      })
      return false;
    }
    
    return true;

}