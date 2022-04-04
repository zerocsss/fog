import { createRouter, createWebHashHistory, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import Welcome from "../views/Welcome.vue"
import { electronStore } from "../utils/electronStore"
import AddServiceAccount from "../components/window/AddServiceAccount.vue"
import SettingView from "../views/Setting.vue"

const routes = [
  {
    path: '/', component: Home
  },
  {
    path: '/welcome', component: Welcome
  },
  {
    path: '/home', component: Home
  },
  {
    path: '/addServiceAccount/:type/:uuid', component: AddServiceAccount
  },
  {
    path: '/settings', component: SettingView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export {
  router
}