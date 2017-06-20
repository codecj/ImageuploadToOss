<template>
	<div class="goodgocar">
		<div class="header">
			选择商品回车仓库
			<img src="../../assets/icon10.png" class="back">
			<img src="../../assets/icon10.png" class="arrow-down">
			<div class="scan">
				<ScanSearch></ScanSearch>
			</div>
		</div>
		<div class="content">
			<ul>
				<li>
					<Cell></Cell>
				</li>
				<li>
					<Cell></Cell>
				</li>
				<li>
					<Cell></Cell>
				</li>
					<li>
					<Cell></Cell>
				</li>
					<li>
					<Cell></Cell>
				</li>
					<li>
					<Cell></Cell>
				</li>
			</ul>
		</div>
		<div class="footer">
			<img src="../../assets/is-selected@2x.png" @click="allselect" class="select-img">
			<span class="select-title">全选</span>
			<span class="btnCar">回车销售</span>
		</div>
	</div>
</template>

<script>
	import Cell from './goodGoCarCell.vue'
	import ScanSearch from './ScanSearch.vue'
	export default {
		data(){
			return{
				isAllSelect:false,
				imgname: 'no-selected@2x.png'
			}
		},
		methods:{
			allselect(){
				 this.isAllSelect = !this.isAllSelect
			}
		},
		components:{
			Cell,
			ScanSearch
		}
	}
</script>

<style scoped>
	.header{
		height: 128px;
		width: 100%;
		color: #3B456C;
		font-size: 40px;
		text-align: center;
		line-height: 128px;
		position: fixed;
		background-color: white;
		top: 0;
		left: 0;
		z-index: 99;
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
		width: 60px;
		height: 60px;
	}
	.scan{
		padding-top:28px;
		height: 98px;
		width: 100%;
		background-color: rgb(237, 238, 245);
/*		position: fixed;
		left: 0;
		top: 128px;*/
	}
	.content{
		margin-top:250px;
	}
	.content ul li:last-child{
		margin-bottom: 99px;
		border-bottom: 1px solid rgb(237, 238, 245);
	}
	.footer{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #fff;
	}
	.footer .select-img{
		position: absolute;
		left: 24px;
		top: 25px;
		width: 48px;
		height: 48px;
	}
	.footer .select-title{
		position: absolute;
		top: 30px;
		left: 80px;
		font-size: 26px;
		color: #4d5679;
	}
	.footer .btnCar{
		float: right;
		height: 98px;
		text-align: center;
		line-height: 98px;
		padding: 0px 52px;
		font-size: 30px;
		color: #fff;
		background: linear-gradient(-18deg, #FF4848 0%, #FF8739 100%);
	}

</style>