export const formatearFecha = (fecha) => {
    fecha = new Date(fecha);
    const fechaFormateada = fecha.toLocaleString('es', {
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
        second : '2-digit'
    });
    return fechaFormateada;
}