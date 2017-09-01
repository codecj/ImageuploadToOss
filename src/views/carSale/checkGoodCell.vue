<template>
	<div>
		<div class="line"></div>
		<div class="content">
			<img v-lazy="this.itemData.URL_ADDR">
			<div class="title">{{this.itemData.NAME}}</div>
			<div class="number">{{this.itemData.totalNum}}</div>
		</div>
	</div>
</template>

<script>
export default {
		data(){
			return{
				
			}
		},
		props:['itemData']
}
	
</script>

<style scoped>
	.line{
		background-color: #f2f2f2;
		width: 100%;
		height: 5px;
	}
	.content{
		height: 220px;
		padding-left: 220px;
		padding-top: 30px;
		position: relative;
	}
	.content img{
		position: absolute;
		left: 10px;
		top: 10px;
		width: 180px;
		height: 180px;
		padding: 20px 30px 30px 20px;
	}
	.content .title{
		color: #3b456c;
		font-size: 30px;
		height: 150px;
	}
	.content .number{
		color: #999;
		font-size: 28px;
		height: 50px;
	}
</style>