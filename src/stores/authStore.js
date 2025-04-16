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
        debugger;
        try {
            const response = await userService.iniciarSesion(credenciales);
            console.log(response);
            token.value = response.data.token;
            user.value = response.data.user;
            localStorage.setItem("authToken", JSON.stringify(token.value));
            localStorage.setItem("user", JSON.stringify(user.value));
        }
        catch (error) {
            throw new Error(error.message)
        }


    }

    const sesionIniciada = () => !!token.value;
    return {
        token,
        user,
        iniciarSesion,
        sesionIniciada
    }

})