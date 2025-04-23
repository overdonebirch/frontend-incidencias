export const mapearColorUrgencia = (urgencia) => {

    return mapeo[urgencia];

}

const mapeo = {
    'Muy Alta' : 'red-darken-2',
    'Alta' : 'deep-orange-darken-1 ',
    'Media' : 'amber-lighten-1 ',
    'Baja' : 'blue-lighten-3',

}