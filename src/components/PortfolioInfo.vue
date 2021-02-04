<template>
    <div>
        <p>Оценка портфеля:</p> 
        <span>{{summ}} USD</span>
    </div>
</template>

<script>
export default {
    props: {
        summ: {
            type: Number,
            required: true
        }
    }
}
</script>