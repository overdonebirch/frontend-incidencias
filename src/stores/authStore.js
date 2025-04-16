import { defineStore } from "pinia";
import { ref } from "vue";
export const useAuthStore = defineStore("auth",() => {
    const token = ref(null);
    const user = ref(null);
    token.value = JSON.parse(localStorage.getItem("authToken")) || null;
    user.value = JSON.parse(localStorage.getItem("user")) || null;
    
    const iniciarSesion = (userToken,userApi) => {
        token.value = userToken;
        user.value = userApi;
        localStorage.setItem("authToken",JSON.stringify(token.value));
        localStorage.setItem("user",JSON.stringify(user.value));
    }

    const sesionIniciada = () => !!token.value;
    return {
        token,
        user,
        iniciarSesion,
        sesionIniciada
    }

})