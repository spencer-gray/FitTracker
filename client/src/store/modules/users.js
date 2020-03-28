//import axios from 'axios';

const state = {
    loginState: false
};

const getters = {
    getLoginState: (state) => {
        return state.loginState;
    }
};

const actions = {};

const mutations = {
    setLoginState: (state, loginState) => {
        state.loginState = loginState
    }
};


export default {
    state,
    getters,
    actions,
    mutations
}