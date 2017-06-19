import MyCommission from '../views/MyCommission.vue'
import SettledCommission from '../views/SettledCommission.vue'
import PresettleCommission from '../views/PresettleCommission.vue'
import clientServer from '../views/clientServer.vue'
import addCar from '../views/addCar.vue'
import searchList from '../views/listcomponent.vue'
import search from '../views/customersearch.vue'
import changding from '../views/changding.vue'
import yongjin from '../views/yongjinshangpin.vue'
import xinpin from '../views/xinpin.vue'
import nosearch from '../views/nosearch.vue'
import selectTrunckGoods from '../views/carSale/selectTrunkGoods.vue'
const carSellerManagerHome = resolve => require(['../views/carSale/CarSellerManagerHome.vue'], resolve)
const test = resolve => require(['../views/test.vue'], resolve)


export default {
    // mode:'history',
    routes: [{
            path: '/clientServer',
            component: clientServer //客户服务首页
        },{
            path: '/list',
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
        },
        {
            path: '/carSellerManagerHome',
            component: carSellerManagerHome
        },
        {
            path:'/test',
            component: test
        },
        {
            path:'/selectTrunckGoods',
            component:selectTrunckGoods
        }
    ]
}
