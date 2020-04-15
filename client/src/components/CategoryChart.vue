<template>
    <div class="pie-chart">
        <VueApexCharts height="400" type="donut" :options="chartOptions" :series="series"></VueApexCharts>
    </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

export default {
    name: "CategoryChart",
    components: {
        VueApexCharts,
    },
    props: {
        series: {
            type: Array,
            default: null
        },
        labels: {
            type: Array,
            default: null
        }
    },
    data: function() {
      return {
        chartOptions: {
            chart: {
                type: 'donut',
                // width: '60%'
            },
            labels: this.labels,
            title: {
                text: "Exercise Frequency",
                align: 'center',
                margin: 20,
                style: {
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#30475e'
                }
            },
            legend: {
                show: true,
                position: 'bottom',
            },
            fill: {
                type: 'gradient'
            },
        },
      }
    },
}
</script>

<style lang="scss">
.pie-chart {
    margin: 1rem 4rem;
}
</style>