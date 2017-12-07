import PageTransition from '../Components/PageTransition.vue'

//路由懒加载
const index = resolve => require(['../views/index.vue'],resolve)
const second = resolve => require(['../views/second.vue'],resolve)
const third = resolve => require(['../views/third.vue'],resolve)
const forth = resolve => require(['../views/forth.vue'],resolve)




export default {
    mode:'history',
    routes: [{
            path: '/',
            name: 'PageTransition',
            component: PageTransition,
            children: [
                {
                    path: '/index',//首页
                    name:"index",
                    component: index,
                },
                  {
                    path: '/second',//第二页
                    name:"second",
                    component: second,
                },
                  {
                    path: '/third',//第三页
                    name:"third",
                    component: third,
                },
                {
                    path: '/forth',//第三页
                    name:"forth",
                    component: forth,
                },
               
            ]}  
     ]
}