<!-- 我的佣金模块 -->
<template>
	<div id="MyCommission">
		<div class="header">
			<h4>4月待结算佣金</h4>
			<div class="price">
				<span>￥</span>
				<span>886</span>
				<span>.00</span>
			</div>
		</div>
		<div class="content">
			<span>上月已结算佣金</span>
			<span>￥668.00</span>
			<img src="../assets/icon17.png" class="right">
		</div>
		<div class="footer">
			<img src="../assets/icon21.png" class="left">
			<span>提现</span>
			<img src="../assets/icon17.png" class="right">
		</div>
	</div>

</template>

<script type="text/javascript">
	
</script>

<style scoped>
	#MyCommission {
		height: 1500px;
		position: relative;
		background-color: rgb(239,240,246);
	}
	.header {
		background-color: #fff;
		height: 236px;
		border-bottom: 2px solid #F1F2F7;
		position: relative;
		top:24px;
	}
	.header h4 {
		font-size: 26px;
		color: #9DA2B5;
		letter-spacing: 0;
		position: absolute;
		left: 32px;
		top: 40px;
	}
	.header .price{
		color: #FF783C;
	}
	.header .price span:nth-child(1) {
		font-size: 30px;
		position: absolute;
		left: 32px;
		top: 152px;
	}
	.header .price span:nth-child(2) {
		font-size: 88px;
		position: absolute;
		width: 158.4px;
		height: 139px;
		left: 72px;
		top: 100px;
	}
	.header .price span:nth-child(3) {
		font-size: 48px;
		position: absolute;
		line-height: 123px;
		height: 132px;
		width: 71px;
		top: 107px;
		left: 220.4px;
	}
	.content {
		position: relative;
		background-color: #fff;
		height: 110px;
		top: 24px;
	}
	.content span:nth-child(1) {
		position: absolute;
		font-size: 30px;
		color: #3B456C;
		left: 32px;
		top: 37px;
	}
	.content span:nth-child(2) {
		font-size: 30px;
		color: #3B456C;
		position: absolute;
		right: 70px;
		top: 37px;
	}
	.content img {
		position: absolute;
		left: 705px;
		top: 40px;
		width: 32px;
		height: 32px;
	}
	.footer {
		position: relative;
		top: 54px;
		height: 112px;
		width: 750px;
		background-color: #fff;
	}
	.footer img.left {
		position: absolute;
		left: 35px;
		top: 36px;
		width: auto;
		height: 40px;
	}
	.footer span {
		position: absolute;
		top: 35px;
		left: 104px;
		font-size: 30px;
		color: #3B456C;
	}
	.footer img.right {
		position: absolute;
		left: 705px;
		top: 45px;
		width: 32px;
		height: 32px;
	}
</style>