const clientServer = resolve => require(['../views/clientServer.vue'], resolve)
const searchList = resolve => require(['../views/listcomponent.vue'], resolve)
const search = resolve => require(['../views/customersearch.vue'], resolve)
const MyCommission = resolve => require(['../views/MyCommission.vue'], resolve)
const SettledCommission = resolve => require(['../views/SettledCommission.vue'], resolve)
const PresettleCommission = resolve => require(['../views/PresettleCommission.vue'], resolve)
const changding = resolve => require(['../views/changding.vue'], resolve)
const yongjin = resolve => require(['../views/yongjinshangpin.vue'], resolve)
const xinpin = resolve => require(['../views/xinpin.vue'], resolve)
const addCar = resolve => require(['../views/addCar.vue'], resolve)
const nosearch = resolve => require(['../views/nosearch.vue'], resolve)

export default {
    // mode:'history',
    routes: [{
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
        },
        { path: '*', redirect: '/clientServer' },
        {
        	path:'/nosearch',
        	component:nosearch
        }
    ]
}
