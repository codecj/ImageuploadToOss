<template>
  <div class="second">
		<p @click="back()"  style="margin-bottom:50px">点击返回</p>
		<p @click="goPage()">点击进入第3页</p>
		
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
		},
		goPage(){
			this.$router.push("third")
		}
	},

	activated(){
        console.log(this.$router.ifBack)
        if(!this.$router.ifBack){
			console.log("第二页")
        }
	},
	// mounted(){
	// 	if(!this.$router.ifBack){
	// 		console.log("第二页")
	// 	}
	// }
	
}
</script>
<style scoped>
	
</style>