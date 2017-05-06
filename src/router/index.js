import secondcomponent from '../component/secondcomponent.vue'
import clientServer from '../component/clientServer.vue'
import  First from '../component/firstcomponent.vue'
import  order from '../component/order.vue'

import  customer from '../component/customermanagement.vue'
import searchList from '../component/listcomponent.vue'
import search from '../component/customersearch.vue'



export default{
	routes: [
    {
      path: '/',
      component: First
    },
    {
      path: '/second',
      component: secondcomponent

    },{
			path:'/order',
			component: order

		},
    {
      path: '/clientServer',
      component: clientServer
    },{
      path: '/customer',//客户列表
      component: customer
    }, {
      path: '/list',
      component: searchList
    },{
      path:'/search',
      component:search
    }
  ]
}
