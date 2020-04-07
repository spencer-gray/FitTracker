import axios from 'axios';

const state = {
    loginState: false,
    username: '',
    email: '',
};

// need to figure out how to access users (what is token?)
axios.get('http://localhost:5000/users')
    .then(function(response) {
        // handle success
        console.log(response);
    })

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