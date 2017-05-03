import secondcomponent from '../component/secondcomponent.vue'
import  First from '../component/firstcomponent.vue'

export default{
	routes: [
    {
      path: '/',
      component: First
    },
    {
      path: '/second',
      component: secondcomponent
    }
  ]
}