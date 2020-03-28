// Entry point to Vuex

import Vuex from 'vuex';
import Vue from 'vue';
import users from './modules/users';
import createPersistedState from 'vuex-persistedstate';

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
    modules: {
        users
    },
    plugins: [createPersistedState()]
});