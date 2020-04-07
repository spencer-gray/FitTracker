import Vue from 'vue'
import VueRouter from 'vue-router'
import Exercises from '../views/Exercises.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import AddWorkout from '../views/AddWorkout.vue'
import UpdateWorkout from '../views/UpdateWorkout.vue'
import ActivityLog from '../views/ActivityLog.vue'
import LandingPage from '../views/LandingPage.vue'
import Profile from '../views/Profile.vue'
import ChatRoom from '../views/ChatRoom.vue'

Vue.use(VueRouter);

const routes = [
    { path: '/exercises', name: 'Exercises', component: Exercises },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/add-workout', name: 'AddWorkout', component: AddWorkout },
    { path: '/update-workout', name: 'UpdateWorkout', component: UpdateWorkout },
    { path: '/activity-log', name: 'ActivityLog', component: ActivityLog },
    { path: '/profile', name: 'Profile', component: Profile },
    { path: '/chatroom', name: 'ChatRoom', component: ChatRoom },
    { path: '/', name: 'LandingPage', component: LandingPage },
]

const router = new VueRouter({
    routes
})

export default router