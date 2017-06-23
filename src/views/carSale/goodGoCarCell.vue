<template>
	<div class="gocarCell">
		<span class="cellselect-img" :class="{cellNoselect:!isSelected, cellIsselect:isSelected}" @click="tap"></span>
		<img v-lazy="this.good.PRODUCT_THUMBNAIL" class="cell-img">
		<div class="cell-msg">
			<div class="cell-title">
				{{this.good.STK_NAME}}
			</div>
			<div class="cell-num">
				{{this.good.UOM_QTY}}
			</div>
			<div class="cell-add">
				<div class="cell-dianp">{{this.good.CUST_NAME}}</div>
				<div class="cell-time">{{this.good.MAS_DATE}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				isSelected:false,
			}
		},
		methods:{
			tap(){
				this.isSelected = !this.isSelected
			}
		},
		props: ['good']
	}
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
		left: 0px;
		top: 0px;
		width: 96px;
		height: 296px;
	}
	.cellNoselect{
		background: url("../../assets/icon59.png") no-repeat center center;
		background-size: 48px 48px;
	}
	.cellIsselect{
		background: url("../../assets/icon59-1.png") no-repeat center center;
		background-size: 48px 48px;
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
		height: 80px;
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