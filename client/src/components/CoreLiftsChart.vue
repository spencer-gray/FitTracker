<script>
import { Line } from 'vue-chartjs'

export default {
    extends: Line,
    props: {
        chartdata: {
            type: Object,
            default: null
        }, 
        options: {
            type: Object,
            default: null
        },
    },
    data() {
        return {
            gradient: null,
        }
    },
    mounted() {
        // Commented out temporarily, will implement gradient background shading for cleaner UI
        // this.gradient = this.$refs.canvas
        //     .getContext("2d")
        //     .createLinearGradient(0, 0, 0, 450);
        // this.gradient.addColorStop(0, '#30475e');
        // this.gradient.addColorStop(1, 'rgba(0, 140, 230, 0.25)')
        // this.gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

        this.renderChart(this.chartdata, this.options);
        
    },
    watch: {
        chartdata() {
            this.renderChart(this.chartdata, this.options);
        }
    }
}
</script>