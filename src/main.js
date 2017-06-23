import './static/css/reset.css'
import Vue from 'vue'
import 'lib-flexible'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
import App from './App.vue';
import VueRouter from "vue-router";
import {focus} from 'vue-focus';
import  routerConfig from './router'
import FastClick from 'fastclick'
import filters from './filters'
import {  Lazyload } from 'mint-ui'
Vue.use(Lazyload, {
    preLoad: 1.3,
    lazyComponent: true,
    error: require('./assets/holde.png'),
    loading: require('./assets/holde.png'),
    listenEvents: ['scroll']
})
Object.keys(filters).forEach((k) => Vue.filter(k, filters[k]))
//开启debug模式
Vue.config.debug = true;
if ('addEventListener' in document) {  
  document.addEventListener('DOMContentLoaded', function() {  
    FastClick.attach(document.body);  
  }, false);  
}  
VueRouter.prototype.goBack = function(){
	window.history.go(-1);
}
Vue.use(VueRouter);

const router=new VueRouter(routerConfig);
const app = new Vue({
    router: router,
    render: h => h(App)
}).$mount('#app')

