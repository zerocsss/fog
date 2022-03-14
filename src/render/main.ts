import { createApp } from 'vue'
import App from './App.vue'

import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css'
import ArcoVueIcon from '@arco-design/web-vue/es/icon';

import i18n from "./locale";
import { router } from "./route"

import "./style/init.css"

import { store, key } from "./store"

const app = createApp(App)

app.use(ArcoVue, {
  componentPrefix: 'fog'
})
app.use(ArcoVueIcon)
app.use(store, key)
app.use(i18n)
app.use(router)

app.mount("#app")
