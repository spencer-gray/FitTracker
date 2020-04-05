<template>
<div id="exerciseList">
    <table v-if="category != null">
        <thead>
            <tr>
                <th>Exercise</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr v-bind:key="exercise.id" v-for="exercise in exercises">
                <template v-if="exercise.fields.category === category">
                    <!-- could have a exercise image field too-->
                    <td>{{ exercise.fields.name }}</td>
                    <!-- period entries have 8 chars... that's why we want > 8-->
                    <td v-if="exercise.fields.description.length > 8">{{ stripHtml(exercise.fields.description) }}</td>
                    <td v-else>No Description Provided.</td>
                </template>
            </tr>
        </tbody>
    </table>
</div>    
</template>

<script>
export default {
    name: 'ExerciseList',
    props: {
        exercises: Array,
        category: Number,
    },
    methods: {
        // cleans up html tags from js string while retaining text inside
        stripHtml: function(html){
            var tmp = document.createElement("DIV");
            tmp.innerHTML = html;
            return tmp.textContent || tmp.innerText || "";
        }
    }
};
</script>

<style scoped lang="scss">
#exerciseList {
    width: 80%;
    margin: 0 auto;
}

table {
    border: 2px solid #30475e;
    border-radius: 3px;
    background-color: #ffffff;
    margin-left: auto;
    margin-right: auto;
    margin-top: 2rem;
    font-size: 18px;
    th {
        background-color: #30475e;
        color: white;
    }
    td {
        border-top: 1px solid #30475e;
        border-bottom: 1px solid #30475e;
    }
    th, td {
        padding: 1rem;
        min-width: 120px;
    }
    td:first-child {
        border-right: 2px solid #30475e;
        margin-right: 2000px;
    }
}

</style>