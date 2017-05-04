import secondcomponent from '../component/secondcomponent.vue'
import  First from '../component/firstcomponent.vue'
import  customer from '../component/customermanagement.vue'


export default{
	routes: [
    {
      path: '/',
      component: First
    },
    {
      path: '/second',
      component: secondcomponent
    },
    {
      path: '/customer',
      component: customer
    }
  ]
}