import secondcomponent from '../component/secondcomponent.vue'
import First from '../component/firstcomponent.vue'
import MyCommission from '../component/MyCommission.vue'
import SettledCommission from '../component/SettledCommission.vue'
export default {
    routes: [{
        path: '/',
        component: First
    }, {
        path: '/second',
        component: secondcomponent
    }, {
        path: '/myCommission', // 我的佣金
        component: MyCommission

    }, {
        path: '/settleCommission', // 佣金结算明细->已结算
        component: SettledCommission
    }]
}
