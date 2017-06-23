<template>
	<div class="selectTrunkGoods">
		<div class="nav">
			<img @click='backNav()' src="../../assets/icon10.png">
			<label>添加商品</label>
		</div>

		<div class="search">
	  		<img src="../../assets/scanne@2x.png" @click="scan()"></img>
	  		<form @submit.prevent="search">
	  			<input class="borderR" id="search" placeholder="请输入关键字搜索商品" type="search" v-model="keyWord">
	  		</form>
  		</div>

  		<mt-loadmore :bottom-method="requestMore" :top-method="loadTop" 
                     :bottom-all-loaded="allLoaded" :bottomPullText='bottomText'
                     ref="loadmore" class="table">
                <div class="cell">
                	<img class="gooodImg">
                	<label class="goodName">墨西哥辣点击对我的期望的我带我去打网球的期待的强大</label>
                	<label class="vendorName">绍兴无语有限公司</label>
                	<img @click="addGoodStkc()" class="addGoods" src="../../assets/icon9.png">
                </div>
                 <div class="cell">
                	<img class="gooodImg">
                	<label class="goodName">墨西哥辣点击对我的期望的我带我去打网球的期待的强大</label>
                	<label class="vendorName">绍兴无语有限公司</label>
                	<img @click="addGoodStkc()" class="addGoods" src="../../assets/icon_del.png">
                </div>
             
    	</mt-loadmore>
	</div>	
</template>
<script>
	import { navBack } from '../../util/JsBridge.js'
	export default {
		data () {
			return {
				showRightArrow:false,
				keyWord:'',
				allLoaded:false,
				bottomText:'上拉加载更多数据'
			}
		},
		mounted(){

		},
		methods:{
			scan(){

			},
			search(){

			},
			backNav(){
				navBack();
			},
			addGoodStkc(){

			},
			requestMore(){
	    		alert('requestMore');
	    		this.$refs.loadmore.onBottomLoaded();
	    	},
	    	loadTop(){
	    		alert('refresh');
	    		this.$refs.loadmore.onTopLoaded();
	    	}
		}
	}
</script>
<style scoped>
	.selectTrunkGoods{
		width: 100%;
		height: 100%;
		background-color:#f1f2f7;
		position: absolute;
		top: 0px;
		bottom: 0px;
	}
	.selectTrunkGoods .nav{
		position:fixed;
		background-color: #ffffff;
		width: 100%;
		height: 88px;
		line-height: 88px;
		text-align: center;
	}

	.selectTrunkGoods .nav img{
		position:absolute;
		height: 54px;
		width: 54px;
		left: 37px;
		top: 17px;
	}
	.selectTrunkGoods .nav label{
		font-family: PingFangSC-Medium;
		font-size: 40px;
		color: #3B456C;
	}
	.selectTrunkGoods .search{
		width: 100%;
		background-color: #ffffff;
		position: absolute;
		height: 88px;
		top:108px;
	}


	.selectTrunkGoods .search input {
		position: absolute;
		border:none;
		right: 94px;
		height: 100%;
		width: 656px;
		border-right: 1px solid #d9d9d9;
		text-align: left;
		padding-left: 90px;
		background: url('../../assets/icon20.png') left no-repeat;
    	background-size: 44px;
    	background-position: 34px 21px;
	}
	.selectTrunkGoods .search img {
		float: right;
		width: 40px;
		height: 40px;
		margin-top: 22px;
		margin-right: 34px;
	}

	.selectTrunkGoods .table{
		width: 100%;
		top:197px;
		overflow-y: auto;
		position: absolute;
		background-color: #f1f2f7;
		bottom: 0px;
	}


	.selectTrunkGoods .table .cell{
		height:296px;width:100%;
		background-color: #ffffff;
		position: relative;
		margin-top: 10px;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}
	.selectTrunkGoods .table .gooodImg{
		position: absolute;
		width: 200px;
		height: 200px;
		background-color: red;
		left: 32px;
		top:51px;
		border: none;
	}

	.selectTrunkGoods .table .goodName{
		position: absolute;
		width: 450px;
		font-family: PingFangSC-Medium;
		font-size: 30px;
		color: #3B456C;
		right: 40px;
		top:55px;
		display: -webkit-box;
   		overflow: hidden;
    	-webkit-box-orient: vertical;
    	text-overflow: ellipsis;
    	-webkit-line-clamp: 2;
	}
	
	.selectTrunkGoods .table .vendorName{
		position: absolute;
		width: 450px;
		font-family: PingFangSC-Regular;
		font-size: 26px;
		color: #3B456C;
		opacity: 0.5;
		right: 40px;
		bottom:86px;
		display: -webkit-box;
   		overflow: hidden;
    	-webkit-box-orient: vertical;
    	text-overflow: ellipsis;
    	-webkit-line-clamp: 2;
	}

	.selectTrunkGoods .table .addGoods{
		position: absolute;
		right: 34px;
		bottom:45px;
		width: 48px;
		height: 48px;
	}

</style>