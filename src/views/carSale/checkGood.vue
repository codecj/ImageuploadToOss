<template>
	<div class="check">
		<div class="checkHeader">
			<div class="headerTitle">
				查看回库商品
			</div>
			<div class="headerBack">
			<img src="../../assets/icon10.png">
			</div>
		</div>
		<div class="checkBody">
			<ul>
				<li>
					<cell></cell>
				</li>
				<li>
					<cell></cell>
				</li>
				<li>
					<cell></cell>
				</li>
				<li>
					<cell></cell>
				</li>
				<li>
					<cell></cell>
				</li>
				<li>
					<cell></cell>
				</li>
				<li>
					<cell></cell>
				</li>
				<li>
					<cell></cell>
				</li>
			</ul>
		</div>
		<div class="checkBottom">
			<div class="bottomBtn">
				打印回库单
			</div>
		</div>		
	</div>
</template>

<script>
import cell from './checkGoodCell.vue'
export default {
		data(){
			return{
				title:'可口可乐2L',
			}
		},
		components:{
			cell,
		}
}	
</script>

<style>
	.checkHeader{
		height: 88px;
		width: 100%;
		color: #3B456C;
		font-size: 40px;
		text-align: center;
		line-height: 88px;
		position: fixed;
		background-color: #fff;
		left: 0;
		top: 0;
		z-index: 99;
	}
	.headerBack img{
		width: 60px;
		height: 60px;
		position: absolute;
		left: 37px;
		bottom: 14px;
	}
	.checkBody ul li:last-child{
		padding-bottom: 99px;
	}
	.checkBody ul li:first-child{
		padding-top: 88px;
	}
	.checkBottom{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 98px;
		background-color: #fff;
		border-top: 1px solid rgb(237, 238, 245);
		text-align: center;
		line-height: 98px;
	}
	.checkBottom .bottomBtn
	{
		font-size: 30px;
		color: #3B456C
	}
	
</style>