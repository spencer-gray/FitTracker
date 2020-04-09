const state = {
    exercise: {}
};

const getters = {
    getExercise: (state) => {
        return state.exercise;
    }
};

const actions = {};

const mutations = {
    setExercise: (state, exercise) => {
        state.exercise = exercise
    },
};


export default {
    state,
    getters,
    actions,
    mutations
}