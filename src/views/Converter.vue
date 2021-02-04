<template>
  <div>
    <h2>Converter</h2>
    <router-link to="/">Назад</router-link>
        <Loader v-if='loading'/>
        <Convert v-for="item of Items" :key="item.id" :item="item"/>
        <div class="small">
          <ConverterChart 
          v-if="loaded"
          :chartdata="chartdata"
          :chartdata2="chartdata2"
          />
        </div>
  </div>
</template>

<script>
import Loader from '@/components/Loader'
import Convert from '@/components/Convert'
import ConverterChart from '@/components/ConverterChart'

export default {
  name: 'App',
  data() {
    return {
      Items: [],
      loading: true,
      loaded: false,
      chartdata: null,
      chartdata2: null
    }
  },
  components: {
    Loader,
    Convert,
    ConverterChart
  },
  async mounted() {
    await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd%2Cbtc%2Ceth')
      .then(response => response.json())
      .then(json => {
        this.Items = json
        this.loading = false
      })

    this.loaded = false
    try {
      await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=14&interval=daily')
      .then(response => response.json())
      .then(json => {
        this.chartdata = json
      })
      await fetch('https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=14&interval=daily')
      .then(response => response.json())
      .then(json => {
        this.chartdata2 = json
      })    
      this.loaded = true
    } catch (e) {
      console.error(e)
    }
    
    //bitcoin,ethereum,uniswap-state-dollar         <ConverterList v-else-if="Items != 0" v-bind:Items="Items" /> <p v-else> No info </p>
  },
}
</script>

<style scoped>
  .small {
    max-width: 650px;
    margin:  100px auto;
  }
</style>