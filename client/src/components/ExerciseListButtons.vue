<template>
<div id="exerciseButtons">
        <b-button
            v-for="(btn, idx) in buttons"
            :key="idx"
            v-on:click="updateCategory"
            type="is-info"
            outlined
            size="is-medium"
        >
            {{ btn.caption }}
        </b-button>
</div>    
</template>

<script>

export default {
    //name: 'ExerciseListButtons',
    data() {
        return {
            buttons: [
                { caption: 'Abs', state: false },
                { caption: 'Arms', state: false },
                { caption: 'Back', state: false },
                { caption: 'Calves', state: false },
                { caption: 'Chest', state: false },
                { caption: 'Legs', state: false },
                { caption: 'Shoulders', state: false },
            ]
        }
    },
    methods: {
        updateCategory(e) {
            this.$emit('clickedCat', e.target.innerText);   // update parent
        }
    }
};
</script>

<style scoped lang="scss">
#exerciseButtons {
    display: flex;
    justify-content: space-around;
    margin: 3em auto;
    width: 50%;
    text-align: center;
}
</style>