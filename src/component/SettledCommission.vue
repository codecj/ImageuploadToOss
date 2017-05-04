<!-- 佣金结算明细  已结算-->
<template>
	<div id="settledCommission">
		<ul>
			<li>
				<div class="header">
					<h3>好又多超市</h3>
				</div>
				<div class="content">
					<img src="" alt="" class="goodsImg">
					<h4 class="goodsName">墨西哥辣鸡点心面两行位置啊啊啊啊啊</h4>
					<span class="specification">规格：3434*33</span>
					<span class="price">￥200.00</span>
					<img src="" alt="" class="praiseImg">
					<span class="praisePrice">￥8.00</span>
					<span class="goodsCount">x3</span>
				</div>
				<div class="footer">
					<span class="commissionTime">结算时间 2017.4.11 16：30</span>
					<img src="" alt="" class="praiseImg">
					<span class="commissionPrice">￥24.00</span>
				</div>
			</li>
			<li>
				<div class="header">
					<h3>好又多超市</h3>
				</div>
				<div class="content">
					<img src="" alt="" class="goodsImg">
					<h4 class="goodsName">墨西哥辣鸡点心面两行位置啊啊啊啊啊</h4>
					<span class="specification">规格：3434*33</span>
					<span class="price">￥200.00</span>
					<img src="" alt="" class="praiseImg">
					<span class="praisePrice">￥8.00</span>
					<span class="goodsCount">x3</span>
				</div>
				<div class="footer">
					<span class="commissionTime">结算时间 2017.4.11 16：30</span>
					<img src="" alt="" class="praiseImg">
					<span class="commissionPrice">￥24.00</span>
				</div>
			</li>
			<li>
				<div class="header">
					<h3>好又多超市</h3>
				</div>
				<div class="content">
					<img src="" alt="" class="goodsImg">
					<h4 class="goodsName">墨西哥辣鸡点心面两行位置啊啊啊啊啊</h4>
					<span class="specification">规格：3434*33</span>
					<span class="price">￥200.00</span>
					<img src="" alt="" class="praiseImg">
					<span class="praisePrice">￥8.00</span>
					<span class="goodsCount">x3</span>
				</div>
				<div class="footer">
					<span class="commissionTime">结算时间 2017.4.11 16：30</span>
					<img src="" alt="" class="praiseImg">
					<span class="commissionPrice">￥24.00</span>
				</div>
			</li>
		</ul>
	</div>
</template>

<style scoped>
	#settledCommission ul{
		background-color: rgb(239,240,246);
	}
	#settledCommission li{
		background-color: #fff;
		width: 750px;
		height: 528px;
		border-top: 24px solid rgb(239,240,246);
	}
	#settledCommission .header {
		width: 750px;
		height: 114px;
		position: relative;
		border-bottom: 1px solid #F1F2F7;
	}
	#settledCommission .header h3 {
		font-size: 30px;
		color: #3B456C;
		letter-spacing: 0;
		line-height: 40px;
		position: absolute;
		top: 36px;
		left: 32px;
		width: 150px;
		height: 40px;
	}
	#settledCommission .content {
		height: 298px;
		width: 750px;
		position: relative;
		border-bottom: 2px solid #F1F2F7;
	}
	#settledCommission .content .goodsImg {
		position: absolute;
		top: 48px;
		left: 32px;
		width: 200px;
		height: 200px;
		border: 1px solid #fff;
	}	
	#settledCommission .content .goodsName {
		position: absolute;
		top: 48px;
		left: 260px;
		font-size: 30px;
		color: #3B456C;
		letter-spacing: 0;
		line-height: 40px;
	}
	#settledCommission .content .specification {
		position: absolute;
		left: 260px;
		top: 133px;
		font-size: 22px;
		color: #9DA2B5;
	}
	#settledCommission .content .price {
		position: absolute;
		top: 211px;
		left: 256px;
		font-size: 30px;
		color: #FF783C;
	}
	#settledCommission .content .praiseImg {
		position: absolute;
		left: 414px;
		top: 220px;
		border: 1px solid #fff;
		width: 18px;
		height: 25px;
	}
	#settledCommission .content .praisePrice{
		position: absolute;
		left: 445px;
		top: 217px;
		font-size: 22px;
		color: #FF783C;
	}
	#settledCommission .content .goodsCount{
		position: absolute;
		right: 40px;
		top: 218px;
		font-size: 22px;
		color: #3B456C;
	}
	#settledCommission .footer {
		position: relative;
		height: 112px;
		width: 750px;
	}
	#settledCommission .footer .commissionTime{
		position: absolute;
		left: 32px;
		top: 38px;
		font-size: 26px;
		color: #9DA2B5;
	}
	#settledCommission .footer .praiseImg {
		position: absolute;
		left: 520px;
		top: 50px;
		border: 1px solid #fff;
		width: 18px;
		height: 25px;
	}
	#settledCommission .footer .commissionPrice {
		position: absolute;
		right: 32px;
		top: 22px;
		font-size: 48px;
		color: #FF783C;
		height: 69px
	}
	
</style>