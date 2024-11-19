<template>
    <NavBar></NavBar>
    <div class="app">
        <RouterView/>
    </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

    export default {
        components: {
            NavBar
        }
    }
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.app {
    padding: 20px;
}
</style>