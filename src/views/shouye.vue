<template>
  <div class="index">
		<p @click="back()" style="margin-bottom:100px">返回上一页</p>
		<p @click="goNext()">第三页</p>

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
			// this.$router.push("second")
			history.go(-1);
		},
		goNext(){
			this.$router.push("index")

			// location.href="#/index"
		}
	},
	mounted(){
		console.log(2)
	}
	

	
}
</script>
<style scoped>
	
</style>