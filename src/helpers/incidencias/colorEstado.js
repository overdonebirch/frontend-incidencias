export const mapearColorEstado = (estado) => {

    return mapeo[estado];

}

const mapeo = {
    'Abierta' : 'green-lighten-2',
    'En Proceso' : 'yellow-darken-2',
    'Resuelta' : 'teal-lighten-2',
    'Cerrada' : 'blue-grey-lighten-2',

}