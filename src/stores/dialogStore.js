import { defineStore } from "pinia";
import { ref } from "vue";

export const useDialogStore = defineStore('dialogs', () => {

    const mostrarDialog = ref(false);

    return {mostrarDialog}

})