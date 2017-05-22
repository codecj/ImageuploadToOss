<template>
	<div id="onePords">
		<router-link :to="'prodDetail'">
			<div class="onePord">
				<div class="prodImg">
					<img src="../assets/item01.jpg" alt="">				
				</div>
				<div class="prodName">[热销产品] 熊孩子 蔬果干235g综合蔬菜干果蔬干 水果干小吃</div>
				<div class="price">
					<span>￥20.00</span>
					<span>购</span>
				</div>
			</div>
		</router-link>
		<div class="onePord">
			<div class="prodImg">
				<img src="../assets/item02.jpg" alt="">				
			</div>
			<div class="prodName">[热销产品] 好丽友薯愿薯片三连包新旧交替四种口味随机发放</div>
			<div class="price">
				<span>￥19.90</span>
				<span>购</span>
			</div>
		</div>
		<div class="onePord">
			<div class="prodImg">
				<img src="../assets/item03.jpg" alt="">				
			</div>
			<div class="prodName">[热销产品] 德芙巧克力礼盒 丝滑牛奶252g新旧包装随机发货装</div>
			<div class="price">
				<span>￥20.00</span>
				<span>购</span>
			</div>
		</div>
		<div class="onePord">
			<div class="prodImg">
				<img src="../assets/item04.jpg" alt="">				
			</div>
			<div class="prodName">[热销产品] 日本进口零食 玛璐托 长崎蛋糕 260g/袋 饼干糕点</div>
			<div class="price">
				<span>￥20.00</span>
				<span>购</span>
			</div>
		</div>
		<div class="onePord">
			<div class="prodImg">
				<img src="../assets/item05.jpg" alt="">				
			</div>
			<div class="prodName">【天猫超市】蜜诺达摩卡巧克力杏仁小西饼90g/盒曲奇下午茶饼干</div>
			<div class="price">
				<span>￥20.00</span>
				<span>购</span>
			</div>
		</div>
		<div class="onePord">
			<div class="prodImg">
				<img src="../assets/item08.jpg" alt="">				
			</div>
			<div class="prodName"> 箭牌口香糖益达冰凉薄荷味40粒木糖醇无糖56g糖果</div>
			<div class="price">
				<span>￥20.00</span>
				<span>购</span>
			</div>
		</div>
		<div class="onePord">
			<div class="prodImg">
				<img src="../assets/item06.jpg" alt="">				
			</div>
			<div class="prodName">一定红营养早餐燕麦巧克力500g麦片巧克力零食包喜糖</div>
			<div class="price">
				<span>￥20.00</span>
				<span>购</span>
			</div>
		</div>
		<div class="onePord">
			<div class="prodImg">
				<img src="../assets/item07.jpg" alt="">				
			</div>
			<div class="prodName">喜之郎什锦果肉果冻布丁200g零食品喜糖糖果特产</div>
			<div class="price">
				<span>￥20.00</span>
				<span>购</span>
			</div>
		</div>
		<div class="onePord">
			<div class="prodImg">
				<img src="../assets/item06.jpg" alt="">				
			</div>
			<div class="prodName">一定红营养早餐燕麦巧克力500g麦片巧克力零食包喜糖</div>
			<div class="price">
				<span>￥20.00</span>
				<span>购</span>
			</div>
		</div>
	</div>		
</template>
<script type="text/javascript">

export default({
	name: "onePords",
	data() {
		return {

		}
	},
	components: {

	}

})	
</script>
<style scoped>
	#onePords{
		overflow: hidden;
		padding:10px 0;
		height: 640px;
	}
	.prodImg{
		text-align: center;
	}
	.onePord{
		width:25%;	
		height:300px;
		float:left;
		margin-top:20px;
	}
	.prodName{
		font-size:24px;
		height:70px;
		overflow: hidden;
	 	text-overflow: ellipsis;
	 	display: -webkit-box;
	 	-webkit-line-clamp: 2;
	 	-webkit-box-orient: vertical;
	 	margin:10px 10px 10px 14px;
	 	color:#000;

	}
	.price {
		margin-left:14px;

	}
	.price span:nth-child(1){
		font-size:30px;
		color:#f00;
	}
	.price span:nth-child(2){
		color:#fff;
		background:#f00;
		font-size:30px;
		padding: 0px 10px;
		border-radius:50%;
	}
	.onePord img{
		width:150px;
		height:150px;
	}

</style>