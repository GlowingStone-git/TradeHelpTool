<template>
    <div class="converter">
        <div class="convert_block_item">
            <input type="number" placeholder="введите сумму..." v-on:change='Convert' v-model="input"/>
            <select v-on:change='Convert' v-model="select1">
                <option>USD</option>
                <option>BTC</option>
                <option>ETH</option>
            </select>
        </div>
        <div class="convert_block_item">
            <input type="text" placeholder="0" v-on:change='Convert' v-model="result" disabled/>
            <select v-on:change='Convert' v-model="select2">
                <option>USD</option>
                <option>BTC</option>
                <option>ETH</option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            select1: '',
            select2: '',
            input: '',
            result: ''
        }
    },
    mounted () {
        this.select1 = 'USD'
        this.select2 = 'USD'
    },
    methods: {
        Convert () {
            let c = {'USD': this.item.usd, 'BTC': this.item.btc, 'ETH': this.item.eth}; 
            let z = 0;
            if(this.select1 === this.select2){ 
                this.result = this.input; 
            } else {
                if (this.select1 != 'BTC') { // Если не равны рублю, то
                    z = this.input*c[this.select2]; // Переводим сумму в рубли
                    this.result = Math.ceil((z/c[this.select1])*100)/100; 
                } else { 
                    this.result = Math.ceil((this.input*c[this.select2])*100)/100; 
                }
            }
        }
    }
}
</script>

<style scoped>
    .converter {
        display: flex;
        flex-direction: column;
        align-content: center;

        margin-top: 15px;
    }

    .convert_block_item {
        display: inherit;
        flex-direction: row;
        justify-content: center;

        margin: 10px;
    }

    input {
        padding: 20px;
        
        font-size: 20px;
    }

</style>