import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'

import vuetify from '@/plugins/vuetify'
import '@/styles/main.sass'

const app = createApp(App)

app
  .use(createPinia())
  .use(vuetify)
  .use(router)

app.mount('#app')
