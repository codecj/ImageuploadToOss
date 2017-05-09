<template>
  <div id="app">
  <router-view></router-view>
  </div> 
</template>

<script>
import order from './component/order.vue'
export default {
  data () {
    return {
      userName:'order',
      message: 'Welcome to Your Vue.js App'
    }
  },
  components:{order}
}
</script>

<style>
</style>
