<template>
  <div class="third">
		<p @click="back()" style="margin-bottom:100px">点击返回</p>
		<div @click="page">传给子元素</div>
		<pages ref="names"></pages>
  </div>
</template>
<script>
import pages from "../components/page.vue"
export default {
	data(){
		return{
			list:["子组件","父组件"]
		}
	},
	components:{
		pages
	},
	methods:{
		back(){
			this.$router.goBack()
		},
		page(){
			//传参数可以使用这种方法
			this.$refs.names.getSrcList(this.list); 
		}
	},
	activated(){
		// console.log(this.$router.ifBack)
		if(!this.$router.ifBack){
			console.log("第四页")
		}
	},
	// mounted(){
	// 	console.log("第四页")
		
	// }
	
}
</script>
<style scoped>
	
</style>