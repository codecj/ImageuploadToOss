<template>
  <div class="third">
		<p @click="back()" style="margin-bottom:20px">点击返回</p>
		<p @click="goPage()">点击进入第4页</p>

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
			this.$router.push("forth")
		}
	},
	activated(){
		if(!this.$router.ifBack){
			alert("第三页")
        }
	},
	// mounted(){
	// 	 if(!this.$router.ifBack){
	// 		console.log("第三页")
			
 //        }
		
	// }
	
}
</script>
<style scoped>
	
</style>