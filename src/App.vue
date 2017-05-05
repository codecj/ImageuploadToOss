<template>
  <!-- <div id="app">
    <p>{{message}}</p>
    <input type="text" v-model="message"/>
    <ul>
        <li>
          <router-link :to="'/'">点我跳转到第一页</router-link>
        </li>
        <li>
          <router-link :to="{path:'second',query:{dataId:userName}}">点我跳转到第二页</router-link>
        </li>
    </ul> -->
     <!-- 路由外链 -->
  <router-view></router-view>
  <!-- </div> -->
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 30px;
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
  padding:0;
  margin:0;
}

/* 清除浮动 */
.clearfix::before,
.clearfix::after{
  content:'';
  display: block;
  line-height: 0;
  height: 0;
  visibility: hidden;
  clear: both;
}

ul {
  list-style-type: none;
  padding: 0;
}

/*h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 100px;
}

a {
  color: #42b983;
}*/
</style>
