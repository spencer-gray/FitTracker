import Vue from 'vue'
import VueRouter from 'vue-router'
import Exercises from '../views/Exercises.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'

Vue.use(VueRouter);

const routes = [
  { path: '/exercises', name: 'Exercises', component: Exercises },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
]

const router = new VueRouter({
  routes
})

export default router
