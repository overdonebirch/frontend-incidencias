import { defineStore } from "pinia";
import { ref } from "vue";
import { useUserService } from "../services/userService";
import { de } from "vuetify/locale";

export const useAuthStore = defineStore("auth", () => {
    const token = ref(null);
    const user = ref(null);
    token.value = JSON.parse(localStorage.getItem("authToken")) || null;
    user.value = JSON.parse(localStorage.getItem("user")) || null;

    const userService = useUserService();

    const iniciarSesion = async (credenciales) => {

        try {
            const response = await userService.iniciarSesion(credenciales);
            console.log(response);
            token.value = response.data.token;
            user.value = response.data.user;
            localStorage.setItem("authToken", token.value);
            localStorage.setItem("user", JSON.stringify(user.value));
        }
        catch (error) {
            console.log(error);
            throw new Error(error.message)
        }


    }

    const logout = async () => {

        try{
            const response = await userService.logout();
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");
            token.value = null;
            user.value = null;
        }
        catch(error){
            throw new Error(error.message)
        }
    }
    const sesionIniciada = () => !!token.value;
    return {
        token,
        user,
        logout,
        iniciarSesion,
        sesionIniciada
    }

})