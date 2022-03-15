import { createRouter, createWebHashHistory, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import Welcome from "../views/Welcome.vue"
import { electronStore } from "../utils/electronStore"
import AddServiceAccount from "../components/window/AddServiceAccount.vue"

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
    path: '/addServiceAccount/:type', component: AddServiceAccount
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export {
  router
}