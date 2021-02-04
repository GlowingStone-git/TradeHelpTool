<template>
    <div>
        <h2>Портфель</h2>
        <router-link to="/">Назад</router-link>
        <Loader v-if='loading'/>
        <PortfolioList 
            v-bind:Items='Items'
            @add-volume='addVolume'
            @deduct-volume='deductVolume'
        />
        <hr>
        <div class="block">
            <PortfolioInfo 
                v-bind:summ='summ'
            />
            <PortfolioChart 
                v-bind:chart-data="chartdata"
            />
        </div>
    </div>
</template>

<script>
import Loader from '@/components/Loader'
import PortfolioList from '@/components/PortfolioList'
import PortfolioInfo from '@/components/PortfolioInfo'
import PortfolioChart from '@/components/PortfolioChart'

export default {
    async mounted() {
        await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cuniswap-state-dollar&vs_currencies=usd')
        .then(response => response.json())
        .then(json => {
            this.loading = false
            this.Items[0].price = json.bitcoin.usd
            this.Items[1].price = json.ethereum.usd
        })
        this.balanceChange()
        //bitcoin,ethereum,uniswap-state-dollar    
    },
    data () {
        return {
            Items: [
                {id: '0', name: 'Bitcoin', price: '', volume: '32'},
                {id: '1', name: 'Ethereum', price: '', volume: '24'},
                {id: '2', name: 'US Dollar', price: '1', volume: '55'}
            ],
            summ: 0,
            loading: true,
            chartdata: {
                labels: '',
                    datasets: [{
                        label: 'Coins',
                        data: '',
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)'
                        ],
                        borderWidth: 1
                    }]
            },
            chartOptions: {}
        }
    },
    components: { 
      PortfolioList,
      Loader,
      PortfolioInfo,
      PortfolioChart
    },
    methods: {
        balanceChange () {
            let summ = 0;
            for(let i = 0; i < this.Items.length ; i++) {
                summ += this.Items[i].price * this.Items[i].volume
            }
            this.summ = Math.round(summ);

            this.chartdata = {
                labels: this.Items.map(c => c.name),
                    datasets: [{
                        label: 'Распределение валюты',
                        data: this.Items.map(c => c.volume),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)'
                        ],
                        borderWidth: 1
                    }]
            }
        },
        addVolume(name) {
            let value = prompt('Введите нужное кол-во')
            let i
            for (i = 0; i < this.Items.length; i++) {
                if (this.Items[i].name == name) {
                    break
                }
            }

            this.Items[i].volume = Number(this.Items[i].volume) + Number(value)
            this.balanceChange()
        },
        deductVolume(name) {
            let value = prompt('Введите нужное кол-во')
            let i
            for (i = 0; i < this.Items.length; i++) {
                if (this.Items[i].name == name) {
                    break
                }
            }

            if ((this.Items[i].volume - value) < 0) {
                alert('Недостаточно средст на балансе')
            } else {
                this.Items[i].volume = Number(this.Items[i].volume) - Number(value)
            }
            this.balanceChange()
        }
    }
}
</script>

<style scoped>
    .block {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
</style>