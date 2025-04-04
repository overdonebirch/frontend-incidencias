import Ajv from "ajv";
import { useAlertasStore } from "../stores/alertasStore";
const ajv = new Ajv({ 
  allErrors: true,
  strict: false 
});


export const validarCampos = (schema, datos) => {

    const alertasStore = useAlertasStore();
    const validar = ajv.compile(schema);
    const esValido = validar(datos);
    
    if (!esValido) {
      const {errors} = validar;
      errors.forEach(error => {
        const {instancePath,message} = error;
        const campo = instancePath.replace("/","");
        const mensaje = campo + " " +message;
        alertasStore.agregarAlerta("error",mensaje);
        console.log(campo,message);
      })
      return false;
    }
    
    return true;

}