export const ordenarPorUrgenciaSeleccionada = (listaIncidencias,urgenciaSeleccionada) => {
    const ordenUrgencias = mapeoUrgencias[urgenciaSeleccionada];

    const prioridades = {
      [ordenUrgencias[0]]: 4,
      [ordenUrgencias[1]]: 3,
      [ordenUrgencias[2]]: 2,
      [ordenUrgencias[3]]: 1
    };
    listaIncidencias.sort((a, b) => {
      return prioridades[b.urgencia] - prioridades[a.urgencia];
    });
};
export const ordenarPorUrgenciasEstandar = (listaUrgencias) => {
  const prioridades = {
    'Muy Alta': 4,
    'Alta': 3,
    'Media': 2,
    'Baja': 1
  };
  
  listaUrgencias.sort((a, b) => {
    return prioridades[b] - prioridades[a];
  });
};

const mapeoUrgencias = {
  "Muy Alta" : ["Muy Alta","Alta","Media","Baja"],
  "Alta" : ["Alta","Muy Alta","Media","Baja"],
  "Media" : ["Media","Muy Alta","Alta","Baja"],
  "Baja" : ["Baja","Muy Alta","Alta","Media"],
}

