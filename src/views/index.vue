<!-- <template>
  <div class="index">
		<p @click="goPage()">点击进入第二页</p>
	
  </div>
</template>
<script>
export default {
	data(){
		return{

		}
	},
	methods:{
		goPage(){
			this.$router.push("second")
		}
	},
	activated(){
		console.log(this.$router.ifBack)
		 if(!this.$router.ifBack){
			console.log("第一页")
        }
	},
	// mounted(){
	// 	 if(!this.$router.ifBack){
	// 	console.log("第一页")
	// 	}

	// }
	
}
</script>
<style scoped>
	
</style> -->
