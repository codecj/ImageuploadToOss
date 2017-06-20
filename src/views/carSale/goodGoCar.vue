<template>
	<div>
		<div class="header">
			选择商品回车仓库
			<img src="../../assets/icon10.png" class="back">
			<img src="../../assets/arrow-down.png" class="arrow-down">
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return{

			}
		}
	}
</script>

<style scoped>
	.header{
		height: 128px;
		color: #3B456C;
		font-size: 40px;
		text-align: center;
		line-height: 128px;
		position: relative;
	}
	.header .back{
		position: absolute;
		left: 37px;
		bottom: 30px;
		height: 60px;
		width: 60px;
	}
	.header .arrow-down{
		position: absolute;
		right: 37px;
		bottom: 30px;
		width: 34px;
		height: 18px;
	}
</style>