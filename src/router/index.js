import secondcomponent from '../component/secondcomponent.vue'
import  First from '../component/firstcomponent.vue'
import  order from '../component/order.vue'

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

		}
  ]
}
