<template>
    <div v-for="marker in markers">
        <ElementComponent :marker="marker"></ElementComponent>
    </div>    
</template>

<style scoped>
</style>

<script>

import ElementComponent from './ElementComponent.vue'

export default {
    props: {
        markers: Array
    },
    components: {
        ElementComponent
    },
    data() {

    },
    mounted(){

    }
}
</script>

