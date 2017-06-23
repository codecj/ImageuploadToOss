<<<<<<< HEAD
//路由懒加载
=======
const trunkList = resolve => require(['../views/carSale/trunkList.vue'],resolve)
>>>>>>> 3c587c9511822ec5b246416ec2565845a6d692f4
const MyCommission = resolve => require(['../views/MyCommission.vue'], resolve)
const SettledCommission = resolve => require(['../views/SettledCommission.vue'], resolve)
const PresettleCommission = resolve => require(['../views/PresettleCommission.vue'], resolve)
const clientServer = resolve => require(['../views/clientServer.vue'], resolve)
const addCar = resolve => require(['../views/addCar.vue'], resolve)
const searchList = resolve => require(['../views/listcomponent.vue'], resolve)
const search = resolve => require(['../views/customersearch.vue'], resolve)
const changding = resolve => require(['../views/changding.vue'], resolve)
const yongjin = resolve => require(['../views/yongjinshangpin.vue'], resolve)
const xinpin = resolve => require(['../views/xinpin.vue'], resolve)
const nosearch = resolve => require(['../views/nosearch.vue'], resolve)
const carSellerManagerHome = resolve => require(['../views/carSale/CarSellerManagerHome.vue'], resolve)
const selectTrunckGoods = resolve => require(['../views/carSale/selectTrunkGoods.vue'], resolve)
const backdepot = resolve => require(['../views/carSale/backDepot.vue'], resolve)
const test = resolve => require(['../views/carSale/test.vue'], resolve)
const goodgocar = resolve => require(['../views/carSale/goodGoCar.vue'], resolve)
import PageTransition from '../Components/carSale/PageTransition.vue'
const selectTrunckGoodsWithNoStock = resolve => require(['../views/carSale/selectTrunkStkcNoStock.vue'], resolve)

export default {
    // mode:'history',
    routes: [{
            path: '/',
            name: 'PageTransition',
            component: PageTransition,
            children:[
                {
                    path: '/clientServer',//客户服务首页
                    component: clientServer
                },{
                    path: '/list',//商品列表
                    component: searchList //商品列表
                }, {
                    path: '/search', //客户列表搜索
                    component: search
                }, {
                    path: '/myCommission', // 我的佣金
                    component: MyCommission
                }, {
                    path: '/settledCommission', // 佣金结算明细->已结算
                    component: SettledCommission
                }, {
                    path: '/presettleCommission', // 佣金结算明细 -> 待结算
                    component: PresettleCommission
                }, {
                    path: '/changding',//常定商品列表
                    component: changding
                }, {
                    path: '/yongjin',//佣金商品列表
                    component: yongjin
                }, {
                    path: '/xinpin',//新增商品列表
                    component: xinpin
                }, {
                    path: '/addCar',//加入购物车弹窗
                    component: addCar
                },{
                    path: '/backdepot',//返回仓库
                    component: backdepot
                },
                {
                    path:'/nosearch',
                    component:nosearch
                },{
                    path: '/carSellerManagerHome',
                    component: carSellerManagerHome
                },{
                    path:'/selectTrunckGoods',
                    component:selectTrunckGoods
                },{
                    path:'/test',
                    component:test
                },{
                    path: '/goodgocar',
                    component: goodgocar

                },{
                    path:'/trunkList',
                    component:trunkList
                },{
                    path:'/selectTrunckGoodsWithNoStock',
                    component:selectTrunckGoodsWithNoStock
                },{ path: '*', redirect: '/clientServer'} 
            ]
        } 
        
    ]
}