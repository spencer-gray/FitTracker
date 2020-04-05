// Entry point to Vuex

import Vuex from 'vuex';
import Vue from 'vue';
import users from './modules/users';
import workout from './modules/workout';
import createPersistedState from 'vuex-persistedstate';

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
    modules: {
        users,
        workout
    },
    plugins: [createPersistedState()]
});