import axios from 'axios';

export const useUserService = () => {

    const api = axios.create({
        baseURL: 'http://localhost:8000'
    });

    // Añadir un interceptor para incluir el token en cada solicitud
    api.interceptors.request.use(config => {
        const token = localStorage.getItem('authToken');
        if (token) {
          // Añadir el token al header de autorización
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    const iniciarSesion = async (credenciales) => {
        try{
            const response = await axios.post('http://localhost:8000/api/login', credenciales);
            return response;
        }
        catch(error){
            throw new Error(error.message)
        }   
    }
    return{
        iniciarSesion
    }
}