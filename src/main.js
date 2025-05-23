import { createApp } from 'vue'
import { createVuetify} from 'vuetify'
import {createPinia} from 'pinia'
import './style.css'
import App from './App.vue'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import router from './router'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'





const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'light'
      }
  })
const pinia = createPinia();


const app = createApp(App);

app.use(vuetify)
app.use(pinia)
app.use(router)

app.mount('#app');