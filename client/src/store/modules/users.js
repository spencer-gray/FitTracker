//import axios from 'axios';

const state = {
    loginState: false,
    username: '',
};

const getters = {
    getLoginState: (state) => {
        return state.loginState;
    },
    getUsername: (state) => {
        return state.username;
    }
};

const actions = {};

const mutations = {
    setLoginState: (state, loginState) => {
        state.loginState = loginState
    },
    setUsername: (state, username) => {
        state.username = username;
    }
};


export default {
    state,
    getters,
    actions,
    mutations
}