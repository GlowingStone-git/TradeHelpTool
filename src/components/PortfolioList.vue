<template>
    <div>
        <ul>
            <PortfolioItem
            v-for="(item, i) of Items" :key="item.id" :item="item" :index='i'
            v-on:add-volume='addVolume' 
            v-on:deduct-volume='deductVolume'
            />
        </ul>
    </div>
</template>

<script>
import PortfolioItem from '@/components/PortfolioItem'
export default {
    props:['Items'],
    components: { 
        PortfolioItem
    },
    methods: {
        addVolume(name) {
            this.$emit('add-volume', name)
        },
        deductVolume(name) {
            this.$emit('deduct-volume', name)
        }
    }
}
</script>

<style scoped>
    ul {
        max-width: 20%;
        list-style : none;
        margin: auto;
        padding: 0;
    }
</style>