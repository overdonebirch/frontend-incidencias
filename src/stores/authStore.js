import { defineStore } from "pinia";
import { ref } from "vue";
import { useUserService } from "../services/userService";
import { de } from "vuetify/locale";

export const useAuthStore = defineStore("auth", () => {
    const token = ref(null);
    const user = ref(null);
    token.value = localStorage.getItem("authToken") || null;
    user.value = JSON.parse(localStorage.getItem("user")) || null;

    const userService = useUserService();

    const iniciarSesion = async (credenciales) => {
        try {
            const response = await userService.iniciarSesion(credenciales);
            token.value = response.data.token;
            user.value = response.data.user;
            localStorage.setItem("authToken", token.value);
            localStorage.setItem("user", JSON.stringify(user.value));
        } catch (error) {
            console.log("Código de estado:", error.response?.status);

            if (error.response?.status === 401) {
                throw new Error("Las credenciales no son válidas");
            } else {
                throw new Error("Error al iniciar sesión: " + error.message);
            }
        }
    };
    const tienePermisoWildcard = (permisoBuscado) => {
        if (!user.value?.permissions) return false;
    
        return user.value.permissions.some(permisoAsignado => {
            const pattern = permisoAsignado
                .replace(/\./g, '\\.')
                .replace(/\*/g, '.*');
            const regex = new RegExp(`^${pattern}$`);
            return regex.test(permisoBuscado);
        });
    };
    

    const logout = async () => {

        try {
            const response = await userService.logout();
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");
            token.value = null;
            user.value = null;
        }
        catch (error) {
            throw new Error(error.message)
        }
    }
    const sesionIniciada = () => !!token.value;
    return {
        token,
        user,
        logout,
        iniciarSesion,
        sesionIniciada,
        tienePermisoWildcard
    }

})