import secondcomponent from '../component/secondcomponent.vue'
import clientServer from '../component/clientServer.vue'
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
      path: '/clientServer',
      component: clientServer
    },{
      path: '/customer',//客户列表
      component: customer
    }
  ]
}