const state = {
    workout: {}
};

const getters = {
    getWorkout: (state) => {
        return state.workout;
    }
};

const actions = {};

const mutations = {
    setWorkout: (state, workout) => {
        state.workout = workout
    },
};


export default {
    state,
    getters,
    actions,
    mutations
}