<template>
	<div class="gocarCell">
		<img src="../../assets/is-selected@2x.png" class="cellselect-img">
		<img src="../../assets/placehold.png" class="cell-img">
		<div class="cell-msg">
			<div class="cell-title">
				在这种情况下，模板不再简单和清晰。在意识到这是反向显示 message 之前，你不得不再次确认第二遍。当你想要在模板中多次反向显示 message 的时候，问题会变得更糟糕。
			</div>
			<div class="cell-num">
				5箱30个
			</div>
			<div class="cell-add">
				<div class="cell-dianp">世纪联华小卖铺</div>
				<div class="cell-time">09/07 08:50</div>
			</div>
		</div>
	</div>
</template>

<script>
	
</script>

<style scoped>
	.gocarCell{
		background-color: #fff;
		width: 100%;
		height: 296px;
		border-top: 1px solid rgb(237, 238, 245);
		position: relative;
	}
	.cell-msg{
		margin-left: 300px;
	}
	.cellselect-img{
		position: absolute;
		left: 24px;
		top: 125px;
		width: 48px;
		height: 48px;
	}
	.cell-img{
		position: absolute;
		left: 96px;
		top: 52px;
		width: 200px;
		height: 200px;
	}
	.cell-msg .cell-title{
		margin: 52px 36px 16px 28px;
		color: #3b456c;
		font-size: 30px;
		overflow: hidden;
  		text-overflow: ellipsis;
  		-webkit-line-clamp:2;
  		-webkit-box-orient: vertical;
  		display: -webkit-box;
	}
	.cell-msg .cell-num{
		margin: 16px 36px 16px 28px;
		color: #9da2b5;
		font-size: 22px;
	}
	.cell-msg .cell-add{
		margin: 16px 36px 52px 28px;
		color: #9da2b5;
		font-size: 22px;
	}
	.cell-msg .cell-add .cell-dianp{
		float: left;
	}
	.cell-msg .cell-add .cell-time{
		float: right;
	}

</style>