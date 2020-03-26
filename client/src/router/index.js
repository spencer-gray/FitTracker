import Vue from 'vue'
import VueRouter from 'vue-router'
import Exercises from '../views/Exercises.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/exercises', name: 'Exercises', component: Exercises },
  { path: '/login', name: 'Login', component: Login }
]

const router = new VueRouter({
  routes
})

export default router
