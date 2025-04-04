export const ordenarPorFechas = (lista,orden) => {
    if(orden === 'Mas Recientes'){
        ordenarPorFechaDescendente(lista);
    }
    else if(orden === 'Mas Antiguas'){
        ordenarPorFechaAscendente(lista);
    }
}

function ordenarPorFechaDescendente(lista) {
    lista.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
    });
}

function ordenarPorFechaAscendente(lista) {
    lista.sort((a, b) => {
        return new Date(a.created_at) - new Date(b.created_at);
    });
}