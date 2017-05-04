import secondcomponent from '../component/secondcomponent.vue'
import  First from '../component/firstcomponent.vue'
import  searchList from '../component/listcomponent.vue'

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
      path: '/list',
      component: searchList
    }
  ]
}