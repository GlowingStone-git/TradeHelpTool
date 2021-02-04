<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    chartdata: {
      type: Object,
      default: null
    },
    chartdata2: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  async mounted () {
    this.newChart(this.chartdata,this.chartdata2)
  },
  methods: {
    newChart (chartdata,chartdata2) {
      let d = new Date()
      let temp = []
      let tempChart = chartdata
      let tempChart2 = chartdata2
      for (let i = 0 ; i < 15 ; i++) {
        temp.push(new Date(d.getTime() - (86400000 * i)))
        tempChart.prices[i].shift()
        tempChart2.prices[i].shift()
      }
      this.renderChart({
        labels: temp.map(c => c.toLocaleDateString()),
          datasets: [
            {
              label: 'BTC',
              data: Array.from(tempChart.prices).map(c => Math.round(Number(c))),
              "fill":false,
              "borderColor":"rgb(75, 192, 192)",
              "lineTension":0.1
            },
            {
              label: 'ETH',
              data: Array.from(tempChart2.prices).map(c => Math.round(Number(c))),
              "fill":false,
              "borderColor":"rgb(75, 100, 192)",
              "lineTension":0.1
            }
          ]
      },
      this.options)
    }
  }
}
</script>

<style>
</style>