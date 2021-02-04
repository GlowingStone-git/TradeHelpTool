<template>
    <li>
        <div class="item-block">
            <p>{{item.name}}</p>
            <p>{{item.volume}} coins</p>
        </div>
        <div class="item-block">
            <button v-on:click="$emit('add-volume', item.name)">Добавить</button>
            <button v-on:click="$emit('deduct-volume', item.name)">Отнять</button>
        </div>
    </li>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
    li {
        border: 1px solid black;
        border-radius: 20px;

        display: flex;
        justify-content: center;
        align-items: center;

        padding: 10px;
        margin: 25px auto;
    }
    p {
        margin: 0;
        padding: 5px 0;
    }
    button {
        margin: 5px 0;
        padding: 5px;

        background: white;
        border: 1px solid black;
    }
    button:hover {
        background: lightblue;
        border: 1px solid black;
    }
    .item-block {
        display: flex;
        flex-direction: column;
        margin: 0 10px;
    }
</style>