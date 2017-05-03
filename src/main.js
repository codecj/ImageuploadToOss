import './static/css/reset.css'
import Vue from 'vue'
import 'lib-flexible'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
import App from './App.vue';
import VueRouter from "vue-router";
import  routerConfig from './router'

//开启debug模式
Vue.config.debug = true;

Vue.use(VueRouter);

const router=new VueRouter(routerConfig);

const app = new Vue({
    router: router,
    render: h => h(App)
}).$mount('#app')
