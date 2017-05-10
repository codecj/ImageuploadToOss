import secondcomponent from '../component/secondcomponent.vue'
import MyCommission from '../component/MyCommission.vue'
import SettledCommission from '../component/SettledCommission.vue'
import PresettleCommission from '../component/PresettleCommission.vue'
import clientServer from '../component/clientServer.vue'
import First from '../component/firstcomponent.vue'
import addCar from '../component/addCar.vue'
import customer from '../component/customermanagement.vue'
import searchList from '../component/listcomponent.vue'
import search from '../component/customersearch.vue'
import changding from '../component/changding.vue'
import yongjin from '../component/yongjinshangpin.vue'
import xinpin from '../component/xinpin.vue'

export default {
    routes: [{
        path: '/',
        component: First
    }, {
        path: '/second',
        component: secondcomponent

    }, {
        path: '/clientServer',
        component: clientServer
    }, {
        path: '/customer', //客户列表
        component: customer
    }, {
        path: '/list',
        component: searchList
    }, {
        path: '/search',
        component: search
    }, {
        path: '/myCommission', // 我的佣金
        component: MyCommission
    }, {
        path: '/settleCommission', // 佣金结算明细->已结算
        component: SettledCommission
    }, {
        path: '/presettleCommission', // 佣金结算明细 -> 待结算
        component: PresettleCommission
    }
    ,{
      path:'/changding',
      component:changding
    },{
      path:'/yongjin',
      component:yongjin
    }
    ,{
      path:'/xinpin',
      component:xinpin
    },{
      path:'/addCar',
      component: addCar
    }]
}
