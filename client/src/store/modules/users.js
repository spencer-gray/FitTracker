
const state = {
    loginState: false,
    username: '',
    email: '',
};

const getters = {
    getLoginState: (state) => {
        return state.loginState;
    },
    getUsername: (state) => {
        return state.username;
    },
    getEmail: (state) => {
        return state.email;
    }
};

const actions = {};

const mutations = {
    setLoginState: (state, loginState) => {
        state.loginState = loginState
    },
    setUsername: (state, username) => {
        state.username = username;
    },
    setEmail: (state, email) => {
        state.email = email;
    },
};


export default {
    state,
    getters,
    actions,
    mutations
}