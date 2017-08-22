<template>
	<div>
		<div class="line"></div>
		<div class="content">
			<img src="../../assets/placehold.png">
			<div class="title">{{title}}</div>
			<div class="number">12组4捆</div>
		</div>
	</div>
</template>

<script>
export default {
		data(){
			return{
				title:'可口可乐2L可口可乐2L可口可乐2L可口可乐2L可口可乐2L可口可乐2L可口可乐2L',
			}
		},
}
	
</script>

<style>
	.line{
		background-color: #f2f2f2;
		width: 100%;
		height: 5px;
	}
	.content{
		height: 220px;
		padding-left: 220px;
		padding-top: 10px;
		position: relative;
	}
	.content img{
		position: absolute;
		left: 10px;
		top: 10px;
		width: 200px;
		height: 200px;
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