<template>
	<div>
		<div class="wrap">
			<div class="no-png"><img src="../assets/icon55.png" /></div>
			<div class="text-1">没有搜索到结果</div>
			<div class="text-2">请用手机号码或者店铺名称搜索</div>
			<div class="no-btn" @conclick="jsbird">创建新客户</div>
		</div>
	</div>
</template>

<script>
	exports default{
		deta
	}
</script>

<style scoped>
	.wrap .no-png {
		margin-top: 224px;
		margin-left: 239px;
	}
	
	.wrap .no-png img {
		width: 271.2px;
		height: 271.2px;
	}
	
	.wrap .text-1 {
		text-align: center;
		font-size: 40px;
		color: #3B456C;
		padding-top: 54.8px;
	}
	
	.wrap .text-2 {
		text-align: center;
		color: #9DA2B5;
		font-size: 26px;
		padding-top: 5px;
	}
	
	.no-btn {
		width: 196px;
		text-align: center;
		border: 2px solid #3B456C;
		border-radius: 4px;
		line-height: 64px;
		position: absolute;
		left: 50%;
		margin-left: -98px;
		margin-top: 48px;
		font-size: 30px;
		color: #3B456C;
	}
</style>