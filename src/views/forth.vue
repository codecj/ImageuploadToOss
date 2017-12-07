<template>
  <div class="third">
		<p @click="back()">点击返回</p>

  </div>
</template>
<script>
export default {
	data(){
		return{

		}
	},
	methods:{
		back(){
			this.$router.goBack()
		}
	},
	activated(){
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